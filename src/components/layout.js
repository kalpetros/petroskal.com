/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="container mx-auto">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer className="p-4 text-center">
          <p>© {new Date().getFullYear()}, kalpetros.</p>
          <p>
            <a href="https://www.gatsbyjs.org">Built with Gatsby</a> &{" "}
            <a href="https://www.tailwindcss.com">tailwindcss</a>
          </p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
