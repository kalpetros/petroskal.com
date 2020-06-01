import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Panel from "./panel"

const BlogPosts = () => {
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
            fields {
              readingTime {
                text
              }
            }
          }
        }
      }
    }
  `)

  return data.allMarkdownRemark.edges.map(data => {
    const { node: blogPost } = data

    const date = blogPost.frontmatter.date
    const readingTime = blogPost.fields.readingTime.text
    const legend = `${date} - ${readingTime}`

    return (
      <div key={blogPost.id} className="mb-8">
        <Panel
          id={blogPost.id}
          title={blogPost.frontmatter.title}
          description={blogPost.excerpt}
          legend={legend}
          path={blogPost.frontmatter.path}
        />
      </div>
    )
  })
}

export default BlogPosts
