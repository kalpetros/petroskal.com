import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Panel from "./panel"

const Articles = () => {
  const data = useStaticQuery(graphql`
    query test {
      allMarkdownRemark {
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

  const results = data.allMarkdownRemark.edges.map(data => {
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

  return <div className="container mx-auto px-8">{results}</div>
}

Articles.propTypes = {
  siteTitle: PropTypes.string,
}

Articles.defaultProps = {
  siteTitle: ``,
}

export default Articles
