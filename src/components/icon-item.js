import PropTypes from "prop-types"
import React from "react"

const IconItem = props => {
  const { name, url, image, imageAlt } = props

  return (
    <div
      className="flex bg-gray-100 dark:bg-gray-700 rounded-full h-12 w-12 items-center justify-center relative has-tooltip"
      data-tooltip={name}
    >
      <a href={url} target="__blank">
        <img className="h-5 w-5" src={image} alt={imageAlt} />
      </a>
    </div>
  )
}

IconItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
}

export default IconItem
