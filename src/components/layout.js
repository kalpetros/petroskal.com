/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import "./layout.css"

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
  faLongArrowAltRight
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
      <main className="max-w-screen-md mx-auto px-12">{children}</main>
      <footer className="text-center p-4">
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by/4.0/"
          target="__blank"
        >
          <img
            className="inline-block"
            src="https://i.creativecommons.org/l/by/4.0/80x15.png"
            alt="Creative Commons License"
          />
        </a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
