import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPosts from "../components/blog-posts"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <BlogPosts />
  </Layout>
)

export default IndexPage
