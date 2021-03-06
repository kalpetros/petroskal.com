/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from "react"
import PropTypes from "prop-types"
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

import Header from "./header"

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

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto px-8 sm:px-12">{children}</main>
      <footer className="text-center p-4"></footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
