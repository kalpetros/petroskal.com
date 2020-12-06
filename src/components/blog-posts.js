import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import Pill from "./pill"
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

    const linkClassName =
      "text-gray-700 dark:text-gray-200 text-2xl leading-tight font-semibold hover:underline"

    const legend = (
      <div className="grid grid-flow-col auto-cols-max gap-2 mb-4">
        <Pill title={date} />
        <Pill title={readingTime} />
      </div>
    )

    return (
      <div key={blogPost.id} className="mb-8">
        <Panel>
          <div>
            {legend}
            <Link className={linkClassName} to={blogPost.frontmatter.path}>
              {blogPost.frontmatter.title}
            </Link>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              {blogPost.excerpt}
            </p>
          </div>
        </Panel>
      </div>
    )
  })
}

export default BlogPosts
