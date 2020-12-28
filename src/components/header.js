import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Button from "./button"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          twitter
          linkedin
          github
          stackoverflow
          email
        }
      }

      avatar: file(relativePath: { eq: "avatar.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const fluidImg = data.avatar.childImageSharp.fluid

  return (
    <header className="bg-white dark:bg-gray-800 sticky top-0 mb-8 z-10">
      <div className="max-w-screen-lg mx-auto px-8 sm:px-12">
        <nav className="grid grid-flow-col py-6 items-center">
          <div className="grid grid-flow-col auto-cols-max gap-4 sm:gap-8 items-center sm:justify-start">
            <Link className="h-12 w-12" to="/">
              <Img
                fluid={fluidImg}
                alt="avatar"
                className="rounded-full"
                placeholderClassName="mb-0"
              />
            </Link>
            <Button title="About" to="/about" />
          </div>
          <div className="grid justify-end">
            <Button
              url={`mailto:${data.site.siteMetadata.email}`}
              icon="envelope-open"
              bgColor="indigo-500"
              bgHoverColor="indigo-600"
              textColor="white"
              tooltip="Contact"
            />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
