import React from "react"

import Layout from "../components/layout"
import Articles from "../components/articles"
import SEO from "../components/seo"

import { library } from '@fortawesome/fontawesome-svg-core'

import { faGithub, faTwitter, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faTwitter, faLinkedin, faStackOverflow, faEnvelopeOpen)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Articles />
  </Layout>
)

export default IndexPage
