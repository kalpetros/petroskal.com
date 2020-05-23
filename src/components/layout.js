/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-12">{children}</main>
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
