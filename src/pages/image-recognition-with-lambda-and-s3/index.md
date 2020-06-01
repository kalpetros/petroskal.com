---
path: "/image-recognition-with-lambda-and-s3"
date: 2020-05-12T21:00:00.000Z
title: "Image recognition with lambda and S3"
---

Last week our team got involved in a project to analyse multiple images using deep learning. There are many ways to approach this but since we didn't have enough time (or data) to train our own model we decided that the best solution would be to use [Amazon Rekognition ](https://aws.amazon.com/rekognition/).

One way to use Rekognition is to upload images in an S3 bucket and then use boto3 to call the Rekognition API with the bucket's name and image you want to analyse.

The problem was that Rekognition expects either an image (jpg, png) or image bytes and we needed to analyse 3rd party images from urls, hence we needed to download them first.

There is no problem with that but if you have millions of images that are constantly updated could be heavy on server resources. We decided that a good solution is to delegated this operation to a service such as [AWS Lambda](https://aws.amazon.com/lambda/).

What is cool about a lambda function is that it can be triggered by changes to a specified bucket, and that turned out to be very suitable for what we wanted.

Our approach was to upload **.json** files that contain image information (url, ids) to a json only bucket that will trigger a lambda function that downloads the images and calls the Rekognition API to get the image analysis.

Finally save the analysis as a **.json** file in a second bucket.

## Example

For most of the examples below I'm going to use the aws cli tool but you can do the same using the console. Ideally it's better to write an IAC configuration ([Terraforn](https://www.terraform.io/), [CloudFormation](https://aws.amazon.com/cloudformation/)).

### Start by creating the buckets in S3

```bash
aws s3api create-bucket --bucket bucket1 --acl private --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1
```

```bash
aws s3api create-bucket --bucket bucket2 --acl private --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1
```

**Note:** LocationConstraint is not needed for US regions.

Create a **.json** with the following content:

```json
{
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Big_Nature_%28155420955%29.jpeg'
}
```

and upload it to the **bucket1** bucket:

```bash
aws s3 cp <path-to-json> s3://bucket1
```

### Create a lambda function

Before you create a lambda function you need to create a role with access to S3.

Create a **.json** file for the trust relationship policy with the following content:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}

```

Create a role:

```bash
aws iam create-role --role-name lambda-function --assume-role-policy-document file://<path-to-trust-policy.json>
```

Attach the **AmazonS3FullAccess** policy to the **lambda-function** role:

```bash
aws iam attach-role-policy --role-name lambda-function --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
```

Also attach the **AmazonRekognitionFullAccess** policy:

```bash
aws iam attach-role-policy --role-name lambda-function --policy-arn arn:aws:iam::aws:policy/AmazonRekognitionFullAccess
```

Run the following to get the role's arn in order to use it to the lambda function creation command:

```bash
aws iam get-role --role-name lambda-function
```

For the purposes of this example I'm going to use Python.

Create the following python file and compress (zip) it since lambda expects a deployment package:

```python
import boto3
import json
import logging
import urllib3
import uuid

BUCKET_ORIGIN = 'bucket1'
BUCKET_DESTINATION = 'bucket2'
S3_CLIENT = boto3.client('s3')
REKOGNITION_CLIENT = boto3.client('rekognition')


def upload_to_s3(json_file, file_name):
    logging.info(f'Uploading {file_name}')

    S3_CLIENT.put_object(
        ACL='public-read',
        Body=json_file,
        Bucket=BUCKET_DESTINATION,
        Key=file_name
    )


def analyse_image(image, image_id):
    logging.info(f'Analysing image {image_id}')

    response = REKOGNITION_CLIENT.detect_labels(
        Image={
            'Bytes': image
        }
    )

    labels = response['Labels']

    result = {
        'image_id': image_id,
        'labels': labels,
    }

    result = json.dumps(result)

    upload_to_s3(result, f'{image_id}.json')


def download_image(url, image_id):
    logging.info(f'Downloading image {image_id}')

    try:
        http = urllib3.PoolManager()
        r = http.request('GET', url)
        image = r.data
    except urllib3.exceptions.ConnectionError as e:
        logging.error(e)
    else:
        analyse_image(image, image_id)


def lambda_handler(event, context):
    response = S3_CLIENT.list_objects(Bucket=BUCKET_ORIGIN)

    for obj in response['Contents']:
        bucket_object = S3_CLIENT.get_object(Bucket=BUCKET_ORIGIN, Key=obj['Key'])
        object_content = bucket_object['Body'].read()
        json_content = json.loads(object_content)
        url = json_content['url']

        download_image(url, str(uuid.uuid4()))

    return {
        'statusCode': 200,
        'body': 'Successfully analysed images'
    }
```

Finally create the lambda function:

```
aws lambda create-function --function-name analyse-images --runtime python3.8 --handler lambda-function.handler --role <arn-from-previous-command> --zip-file fileb://<path-to-archive.zip>
```

If everything goes ok you will see something like the following:

```json
{
    "State": "Active",
    "LastUpdateStatus": "Successful"
}
```

### Enable event notifications for the S3 bucket

You need enable event notifications in order to trigger your lambda function for every change in the bucket.

First you need to create a **.json** with the following:

```json
{
    "LambdaFunctionConfigurations": [
        {
            "Id": "String",
            "LambdaFunctionArn": "<lambda-function-arn>",
            "Events": [
                "s3:ObjectCreated:*"
            ]
        }
    ]
}
```

Add invoke permissions to the lambda function:

```bash
aws lambda add-permission --function-name analyse-images --principal s3.amazonaws.com --statement-id S3StatementId --action "lambda:InvokeFunction" --source-arn <lambda-function-arn> --source-account <account-id>
```

You can find your **account-id** in **IAM -> Account identifiers**.

Then to create the notification event for the bucket type:

```bash
aws s3api put-bucket-notification-configuration --bucket bucket1 --notification-configuration file://<file>.json
```

### Test auto lambda function invocation

Go ahead and push a file to S3 to test that the lambda function gets invoked automatically.

```bash
aws s3 cp file.json s3://bucket1
```

Visit your AWS lambda console and check the monitor tab. There should be an entry in the **Recent invocations** panel.

Finally check **bucket2** for the generated **.json** file with the image analysis.

A Rekognition analysis includes one or more labels. Each label includes an object name with a confidence percentage.

It should look like the following:

```json
{
  "image_id": "9279f316-bdc1-4ca2-bf8c-5a7e7e4e5bbd",
  "labels": [
    {
      "Name": "Nature",
      "Confidence": 99.77134704589844,
      "Instances": [],
      "Parents": []
    },
    {
      "Name": "Outdoors",
      "Confidence": 99.59376525878906,
      "Instances": [],
      "Parents": []
    },
    {
      "Name": "Mountain",
      "Confidence": 99.59376525878906,
      "Instances": [],
      "Parents": [{ "Name": "Nature" }, { "Name": "Outdoors" }]
    },
    {
      "Name": "Mountain Range",
      "Confidence": 99.59376525878906,
      "Instances": [],
      "Parents": [
        { "Name": "Nature" },
        { "Name": "Mountain" },
        { "Name": "Outdoors" }
      ]
    },
    {
      "Name": "Water",
      "Confidence": 98.37708282470703,
      "Instances": [],
      "Parents": []
    },
    {
      "Name": "Lake",
      "Confidence": 94.19097900390625,
      "Instances": [],
      "Parents": [
        { "Name": "Water" },
        { "Name": "Nature" },
        { "Name": "Outdoors" }
      ]
    },
    {
      "Name": "Promontory",
      "Confidence": 91.89735412597656,
      "Instances": [],
      "Parents": []
    },
    {
      "Name": "Peak",
      "Confidence": 84.71919250488281,
      "Instances": [],
      "Parents": [
        { "Name": "Nature" },
        { "Name": "Mountain" },
        { "Name": "Outdoors" },
        { "Name": "Mountain Range" }
      ]
    },
    {
      "Name": "Scenery",
      "Confidence": 83.97937774658203,
      "Instances": [],
      "Parents": [{ "Name": "Nature" }, { "Name": "Outdoors" }]
    },
    {
      "Name": "Plateau",
      "Confidence": 56.99436950683594,
      "Instances": [],
      "Parents": [{ "Name": "Nature" }, { "Name": "Outdoors" }]
    },
    {
      "Name": "Building",
      "Confidence": 56.656410217285156,
      "Instances": [],
      "Parents": []
    },
    {
      "Name": "Housing",
      "Confidence": 56.656410217285156,
      "Instances": [],
      "Parents": [{ "Name": "Building" }]
    },
    {
      "Name": "Slope",
      "Confidence": 55.667579650878906,
      "Instances": [],
      "Parents": []
    }
  ]
}
```
