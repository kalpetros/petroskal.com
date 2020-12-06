import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IconItem = props => {
  const { name, url, image, imageAlt, icon } = props

  return (
    <div
      className="flex bg-gray-100 dark:bg-gray-700 rounded-full h-12 w-12 items-center justify-center relative has-tooltip"
      data-tooltip={name}
    >
      <a href={url} target="__blank">
        {icon ? (
          <FontAwesomeIcon
            className="text-gray-700 dark:text-gray-200"
            icon={props.icon}
          />
        ) : image ? (
          <Img
            fluid={image}
            alt={imageAlt}
            className="h-5 w-5"
            placeholderClassName="mb-0"
          />
        ) : null}
      </a>
    </div>
  )
}

IconItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default IconItem
