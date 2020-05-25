import PropTypes from "prop-types"
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Item = props => {
  let className = "cursor-pointer"

  if (props.iconColor) className = `${className} ${props.iconColor}`

  return (
    <a href={props.url} className={className} target="__blank">
      <FontAwesomeIcon icon={props.icon} />
    </a>
  )
}

Item.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconColor: PropTypes.string,
}

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
    <header className="bg-white sticky top-0 mb-8">
      <div className="max-w-screen-lg mx-auto px-12">
        <nav className="grid grid-cols-2 py-6 items-center">
          <div className="grid grid-flow-col sm:gap-8 items-center sm:justify-start">
            <Link className="h-12 w-12" to="/">
              <Img
                fluid={fluidImg}
                alt="avatar"
                className="rounded-full"
                placeholderClassName="mb-0"
              />
            </Link>
            <Link className="text-gray-400" to="/about">
              <FontAwesomeIcon icon="info-circle" />
            </Link>
          </div>
          <div className="grid grid-flow-col sm:gap-8 items-center sm:justify-end text-right">
            <Item url="https://github.com/kalpetros" icon={["fab", "github"]} />
            <Item
              url="https://twitter.com/kalpetross"
              icon={["fab", "twitter"]}
              iconColor="text-indigo-500"
            />
            <Item
              url="https://www.linkedin.com/in/kalpetros/"
              icon={["fab", "linkedin"]}
              iconColor="text-indigo-700"
            />
            <Item
              url="https://stackoverflow.com/users/2005799/kalpetros"
              icon={["fab", "stack-overflow"]}
              iconColor="text-orange-500"
            />
            <Item url="" icon="envelope-open" />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
