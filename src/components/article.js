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
    }
  }
`

const Article = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO title="Article" />
      <p>{post.frontmatter.date}</p>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
