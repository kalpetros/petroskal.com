import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons"
import {
  faEnvelopeOpen,
  faInfoCircle,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPosts from "../components/blog-posts"

library.add(
  faGithub,
  faTwitter,
  faLinkedin,
  faStackOverflow,
  faEnvelopeOpen,
  faInfoCircle,
  faLongArrowAltLeft,
  faLongArrowAltRight
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <BlogPosts />
  </Layout>
)

export default IndexPage
