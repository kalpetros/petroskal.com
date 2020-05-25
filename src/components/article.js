import PropTypes from "prop-types"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query ArticlePyPath($path: String!) {
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

const Article = ({ data }) => {
  const { markdownRemark: article } = data

  const date = article.frontmatter.date
  const readingTime = article.fields.readingTime.text
  const legend = `${date} - ${readingTime}`

  return (
    <Layout>
      <SEO title={article.frontmatter.title} />
      <p>{legend}</p>
      <h1>{article.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.html }} />
    </Layout>
  )
}

Article.propTypes = {
  siteTitle: PropTypes.string,
}

Article.defaultProps = {
  siteTitle: ``,
}

export default Article
