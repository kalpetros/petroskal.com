import React from "react"

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
      fields {
        readingTime {
          text
        }
      }
    }
  }
`

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark: blogPost } = data

  const date = blogPost.frontmatter.date
  const readingTime = blogPost.fields.readingTime.text
  const legend = `${date} - ${readingTime}`

  return (
    <Layout>
      <SEO title={blogPost.frontmatter.title} />
      <p>{legend}</p>
      <h1>{blogPost.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.html }} />
    </Layout>
  )
}

export default BlogPostTemplate
