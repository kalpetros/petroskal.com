import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
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
    <header className="bg-white sticky top-0 mb-8 shadow">
      <div className="max-w-screen-lg mx-auto px-12">
        <nav className="grid grid-cols-2 py-6 items-center">
          <div className="grid grid-flow-col sm:gap-8 items-center sm:justify-start">
            <Link
              className="h-12 w-12"
              to="/"
            >
              <Img
                fluid={fluidImg}
                alt="avatar"
                className="rounded-full"
                placeholderClassName="mb-0"
              />
            </Link>
            <Link to="/about">
              <FontAwesomeIcon icon="info-circle" />
            </Link>
          </div>
          <div className="grid grid-flow-col sm:gap-8 items-center sm:justify-end text-right">
            <a
              href="https://github.com/kalpetros"
              className="cursor-pointer"
              target="__blank"
            >
              <FontAwesomeIcon icon={["fab", "github"]} />
            </a>
            <a
              href="https://twitter.com/kalpetross"
              className="cursor-pointer text-indigo-500"
              target="__blank"
            >
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
            <a
              href="https://www.linkedin.com/in/kalpetros/"
              className="cursor-pointer text-indigo-700"
              target="__blank"
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]} />
            </a>
            <a
              href="https://stackoverflow.com/users/2005799/kalpetros"
              className="cursor-pointer text-orange-500"
              target="__blank"
            >
              <FontAwesomeIcon icon={["fab", "stack-overflow"]} />
            </a>
            <a href="/" className="cursor-pointer" target="__blank">
              <FontAwesomeIcon icon="envelope-open" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
