import PropTypes from "prop-types"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Article = () => (
  <Layout>
    <SEO title="Article" />
    <div className="m-4">
      <p>12 March 2020</p>
      <h1>Test of testing tests</h1>
      <p>Lorem ipsum</p>
    </div>
  </Layout>
)

Article.propTypes = {
  siteTitle: PropTypes.string,
}

Article.defaultProps = {
  siteTitle: ``,
}

export default Article
