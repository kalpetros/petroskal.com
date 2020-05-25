import React from "react"

import Layout from "../components/layout"
import Articles from "../components/articles"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Articles />
  </Layout>
)

export default IndexPage
