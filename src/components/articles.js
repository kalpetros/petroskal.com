import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Panel from "./panel"

const Articles = () => {
  const data = useStaticQuery(graphql`
    query Articles {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(pruneLength: 250)
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

  return data.allMarkdownRemark.edges.map(data => {
    const { node: article } = data

    return (
      <div key={article.id} className="mb-8">
        <Panel
          id={article.id}
          title={article.frontmatter.title}
          description={article.excerpt}
          legend={article.frontmatter.date}
          path={article.frontmatter.path}
        />
      </div>
    )
  })
}

Articles.propTypes = {
  siteTitle: PropTypes.string,
}

Articles.defaultProps = {
  siteTitle: ``,
}

export default Articles
