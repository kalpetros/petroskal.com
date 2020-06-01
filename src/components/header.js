import PropTypes from "prop-types"
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Item = props => {
  let className = "cursor-pointer"
  const target = props.target

  if (props.iconColor) className = `${className} ${props.iconColor}`

  return (
    <a href={props.url} className={className} target={target}>
      <FontAwesomeIcon icon={props.icon} />
    </a>
  )
}

Item.defaultProps = {
  target: "_blank"
}

Item.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconColor: PropTypes.string,
}

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
    <header className="bg-white sticky top-0 mb-8">
      <div className="max-w-screen-md mx-auto px-12">
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
            <Link to="/about">
              <FontAwesomeIcon icon="info-circle" />
            </Link>
          </div>
          <div className="grid grid-flow-col sm:gap-8 items-center sm:justify-end text-right">
            <Item
              url={data.site.siteMetadata.twitter}
              icon={["fab", "twitter"]}
              iconColor="text-indigo-500"
            />
            <Item
              url={data.site.siteMetadata.linkedin}
              icon={["fab", "linkedin"]}
              iconColor="text-indigo-700"
            />
            <Item
              url={data.site.siteMetadata.github}
              icon={["fab", "github"]}
            />
            {/* <Item
              url={data.site.siteMetadata.stackoverflow}
              icon={["fab", "stack-overflow"]}
              iconColor="text-orange-500"
            /> */}
            <Item
              url={`mailto:${data.site.siteMetadata.email}`}
              icon="envelope-open"
              target="_self"
            />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
