---
path: "/creating-a-blog-with-gatsby"
date: 2020-06-02T21:00:00.000Z
title: "Creating a Blog with Gatsby"
---

A couple of years back I migrated my website from plain js to jhjen and now gatsby.

## Getting started

Assumming you are running a Linux distribution and you have the latest Node.js, npm and git installed type the following in your terminal:

```bash
npm install -g gatsby-cli
```

Make sure it is installed by running:

```bash
gatsby -v
```

Next you need to create the gatsby site:

```
gatsby new <name>
```

The above command will create the basic gatsby site structure based on starter code that fetches from github.

**Note:** It could take some time based on your internet connection.

Then change into the working directory:

```bash
cd <name>
```

and start the development server:

```bash
yarn develop
```

Finally visit your website by navigating to `localhost:8000`.

## Blogging mechanism

Now lets go ahead and create our blogging mechanism.

Stop your development server and type:

```bash
yarn add gatsby-transformer-remark
```

This module is required in order to parse our **Markdown** files and be able to use them in our code.

Once it is installed add the following to your **gatsby-config.json** file:

```json
plugins: [
    {
        resolve: `gatsby-transformer-remark`
    }
]
```

Now we need to think of a way to structure our blog posts.
One way is to create them as files inside the pages folder for example:

```
-- pages
  -- 2020-05-12-a-blog-post.md
  -- index.js
```

or even better create a separate folder for each blog post that will also hold all the blog post's data such as images.

```
-- pages
  -- 2020-05-12-a-blog-post
    -- index.md
    -- image1.png
  -- index.js
```

So now lets create our test **.md** file and add the following markdown code:

```markdown
---
path: "/test-post"
date: 2020-06-02T21:00:00.000Z
title: "Test post"
---

## Great blog
```

The code on top wrapped by **---** is called the **frontmatter** in which you can define whatever data you want for your blog post such as its path, title, date etc.

Next you need to dynamically create the pages along with their routes everytime you add a blog post in the pages folder.

To do that you need to tell gatsby where it can fild these posts. So add the following to your **gatsby-config.js** file.

```json
plugins: [
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: `${__dirname}/src/pages`,
            name: "posts"
        }
    }
]
```

**gatsby-source-filesystem** is required in order to source local data into your Gatsby application. It creates nodes that can be used by other transformer plugins.

**Note:** gatsby-source-filesystem should be already installed. If not add it by running `yarn add gatsby-source-filesystem`

To test that it works open the graphql playground by visiting **localhost:8000/\_\_graphql** and type the following:

```graphql
query {
  allFile {
    edges {
      node {
        name
        base
        sourceInstanceName
      }
    }
  }
}
```

You should get the following response:

```json
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "name": "<blog-post-name>",
            "base": "<blog-post>.md",
            "sourceInstanceName": "posts"
          }
        }
      ]
    }
  }
}
```

Now to actually create our pages you need to add the following code to **gatsby-nodel.js**:

```js
const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {},
    })
  })
}
```

You will see that I defined **blogPostTemplate** which is the React component that our pages will be based on.

In the **blog-post** component you need to create a graphql query in order to get all the nessecary post data.

```js
// blog-post.js
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const data = graphql`
  query BlogPostPyPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark: blogPost } = data

  const date = blogPost.frontmatter.date
  const readingTime = blogPost.fields.readingTime.text

  return (
    <Layout>
      <SEO title={blogPost.frontmatter.title} />
      <p>{date}</p>
      <h1>{blogPost.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.html }} />
    </Layout>
  )
}

export default BlogPostTemplate
```

Notice how you need to inject the **html** code that is generated by the remark plugin using the **dangerouslySetInnerHTML** React property.

**Note:** In general setting HTML from code is risky because our site can be exposed to XSS attacks but for this use case it should be fine.

Finally run `yarn develop` and visit the path you defined in the frontmatter to see your blog post.

## Final touches

In order complete the blog-like functionality you need to add an index for your posts.

To do this you just need to query for every blog post and display them on the landing page.

The query could look like:

```js
const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          frontmatter {
            path
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`)
```

### What is **useStaticQuery**?

This is a way to retrieve data in your components by running a graphql query at build time. It is different than your normal graphql queries since normal queries can only be added to gatsby pages. For all your other components (not in your pages folder) you need to use **useStaticQuery**.

## Adding some flare

To make your posts fancier you can add modules like **gatsby-remark-reading-time**.

This adds Medium-like reading time for each of your posts.

To enable it add it by running:

```bash
yarn add gatsby-remark-reading-time
```

and include it as a **gatsby-transformer-remark** plugin in your **gatsby-config.js**:

```json
{
  "resolve": `gatsby-transformer-remark`,
  "options": {
    "plugins": [`gatsby-remark-reading-time`]
  }
}
```

Then to use it in your graphql queries add the following:

```js
export const data = graphql`
  query BlogPostPyPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
```

Another great plugin is **gatsby-remark-prismjs** which adds syntax highlighting in your markdown code blocks.

To add it run:

```bash
yarn add gatsby-remark-prismjs
```

and also add it as a remark plugin:

```json
{
  "resolve": `gatsby-transformer-remark`,
  "options": {
    "plugins": [`gatsby-remark-reading-time`, `gatsby-remark-prismjs`]
  }
}
```

You will also need to import a basic prismjs theme in your **gatsby-browser.js** file:

```js
import "prismjs/themes/default.css"
```

For a list of themes check the [PrismJS](https://prismjs.com/) website.

Finally to use it in your markdown just add the language you want to use in your code blocks:

````markdown
```json
{
  "key": "value"
}
```
````