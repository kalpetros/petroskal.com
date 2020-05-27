---
path: "/the-importance-of-infrastructure-as-code"
date: 2020-05-17T16:00:00.000Z
title: "The importance of infrastructure as code"
---

Managing complex cloud infrastructure can become a real issue especially when we want to recover from a disaster, add more resources or enforce certainty that our changes do not break anything.

## IAC to the rescue

Infrastucture as code is a declarative language the uses cloud provider API's for resource provisioning.

The way it works is by modelling our entire cloud infrastucture using code thus greatly reduce the stress of managing our resources and at the same time adding certainty that everything will work as expected when we need to make any changes.

Some popular tools for writing IAC are Terraform and CloudFormation. Personally I prefer Terraform since it is a cloud-agnostic solution.

To get started with Terraform go ahead and [download it from the official website](https://www.terraform.io/).

Export the binary's path in your __.profile__
```
export PATH="$PATH:~/path-to-binary"
```

## Build Infrastructure
First you need to create a file with the __.tf__ extension.

Inside the file add the following:
```
provider "aws" {
  region = 'eu-west-1'
}
```

This defines the provider your are about to use.

__Note:__ It is recommended not to hardcode credentials into the *.tf cofiguration files.

Then run the following:
```
$ terraform init
```

By running `terraform init` Terraform downloads everything that is necessary to provision resources in your specified provider.

To format your configuration for easy readability run:
```
$ terraform fmt
```

To syntactically validate your configuration run:
```
$ terraform validate
```

Finally to apply the configuration changes run:
```
$ terraform apply
```

When you apply the configuration, Terraform will show you all the actions it'll take in order to change real infrastructure. You'll notice that Terraform uses a similar format to git diff to display additions and deletions in your resources.

Terraform also keeps track of every ID of the created resources into a __.tfstate__ file. Make sure that you commit this file in your version control so that anyone in your team that uses Terraform can use it.

You could also write state data to a remote data store such as Terraform Cloud or AWS S3.

To use Terraform Cloud as the backend add the following in your __.tf__ file (Make sure you have an account with Terraform):
```
terraform {
  backend "remote" {
    organization = "your-organization-name"

    workspaces {
      name = "your-workspace-name"
    }
  }
}
```

To inspect the current state using:
```
$ terraform show
```

## Change Infrastructure
As your Terraform configuration changes over time, when you run apply it only modifies, creates or destroys what is necessary. By commiting your configuration in version control you can easily see how it is progressing over time.

## Destroy Infrastructure
To destroy all resources that you've created by your configuration run:
```
$ terraform destroy
```

## Resource Dependencies
You can specify if a resource depends on another resource before you create it by using the __depends_on__ argument. For example you can specify that you want an EC2 instance to be created but only after the S3 bucket is created. All other resources that don't have any dependencies can be created in parallel.
```
resource "aws_instance" "ec2" {
  ami             = "ami"
  instance_type   = "instance-type"
  key_name        = "key-name"

  depends_on = [
    aws_s3_bucket.media,
    aws_s3_bucket.static,
    aws_security_group.ec2
  ]
```

Another way to define dependencies is with interpolation expressions.
For example to create an aws elastic ip that depends on an instance you would write the following:
```
resource “aws_eip” “ip” {
    vpc = true
    instance = aws_instance.ec2.ip
}
```

Where ec2 is an instance you defined previously.

## Provisioners
Terraform also gives you the ability to do post operations after your resources are created or destroyed. This is useful if you want to do some initial setup after an instance creation i.e. run scripts, install software etc.

To define a provisioner, add the following to a resource block:
```
Provisioner “local-exec” {
    command = “ls”
}
```

__local-exec__
Executes commands on your local machine.

__remote-exec__
To execute commands on a remote machine you must define an ssh connection in the connection block.

### Failed Provisioner and Tainted Resources
If a resource has been created successfully but there was a problem with your provisioner, Terraform will give you an error and mark this resource as __tainted__.

Next time you apply your configuration, Terraform will remove the tainted resource, create it again and try to run the provisioning step.

### Manually Tainting Resources
You also have the ability to mark a resource as tainted manually if you want to destroy and recreate it.

## Input variables
If your configuration uses a lot of common variables then Terraform lets you create a __variables.tf__ file where you can define all the variables that you need.
```
variable "region" {
  description = "The AWS region the services will use."
  default     = "eu-central-1"
}
```

Then to use the variables in your main configuration write the following:
```
provider "aws" {
  region = var.region
}
```

## Output variables
Output variables is a way to access values like an instance's IP after a Terraform build.

Create an __output.tf__ file and define all the values that you want to get outputted when you run apply.

__Note:__ You can also add values to any of your __.tf__ files.
```
output "instance_ip" {
  value = aws_instance.ec2.public_ip
}
```

## Full configuration

Below you will see a full Terraform configuration that creates an IAM group with an attached policy, a security group with an open SSH port, an EC2 instance, a security group for an RDS instance, an RDS instance, an S3 bucket with subfolders and a CloudFront distribution.
```
terraform {
  backend "remote" {
    organization = "demo"

    workspaces {
      name = "demo"
    }
  }
}

locals {
  app            = "demo"
  s3_media       = "demo-media"
  database       = "demo-db"
}

provider "aws" {
  region = var.region
}

resource "aws_iam_group" "administrators" {
  name = "administrators-test"
}

resource "aws_iam_group_policy_attachment" "ap1" {
  group      = "administrators-test"
  policy_arn = "arn:aws:iam::aws:policy/IAMFullAccess"
  depends_on = [aws_iam_group.administrators]
}

resource "aws_security_group" "ec2" {
  name        = "ec2"
  description = "Default ${local.app} EC2 security group"
  vpc_id      = "vpc-0522b76d"
  tags = {
    Name = "ec2"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "rds" {
  name        = "rds"
  description = "Default ${local.app} RDS security group"
  vpc_id      = "vpc-0522b76d"
  tags = {
    Name = "rds"
  }

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_s3_bucket" "media" {
  bucket = local.s3_media
}

resource "aws_s3_bucket_object" "media_folders" {
  for_each = toset(var.clients)
  bucket   = local.s3_media
  key      = "${each.value}/"

  depends_on = [aws_s3_bucket.media]
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = local.s3_origin_id
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.static.bucket_domain_name
    origin_id   = local.s3_origin_id

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  depends_on = [aws_s3_bucket.static]
}

resource "aws_db_instance" "production" {
  identifier                = local.database
  allocated_storage         = 100
  max_allocated_storage     = 1000
  storage_type              = "gp2"
  apply_immediately         = true
  deletion_protection       = false
  delete_automated_backups  = false
  final_snapshot_identifier = "${local.database}-final-snapshot"
  engine                    = "postgres"
  engine_version            = "10.11"
  instance_class            = "db.t3.small"
  port                      = "5432"
  username                  = "postgres"
  password                  = "test12345!"
  vpc_security_group_ids    = [aws_security_group.rds.id]
  tags = {
    Name = local.database
  }

  depends_on = [aws_security_group.rds]
}

resource "aws_instance" "ec2" {
  ami             = var.ami
  instance_type   = var.instance_type
  key_name        = "demo"
  security_groups = [aws_security_group.ec2.name]
  tags = {
    Name = "demo-test"
  }

  depends_on = [
    aws_s3_bucket.media,
    aws_security_group.ec2
  ]

  provisioner "local-exec" {
    command = "echo ${aws_instance.ec2.public_ip} > ip_address.txt"
  }
}
```
