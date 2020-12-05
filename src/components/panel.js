import PropTypes from "prop-types"
import React from "react"

const Panel = props => {
  const { image, imageAlt, legend, title, description } = props
  let imageEl = null
  const colorClasses = `bg-white dark:bg-gray-700 dark:border-transparent`
  const className = `${colorClasses} flex p-4 border-b leading-normal`

  let descriptionEl =
    description !== "" ? (
      <p className="text-gray-700 dark:text-gray-400 mt-2">{description}</p>
    ) : null

  if (image) {
    imageEl = (
      <div className="flex-shrink-0 mr-6 h-12 w-12 rounded-full overflow-hidden">
        <img className="mb-0 grayscale" src={image} alt={imageAlt} />
      </div>
    )
  }

  return (
    <div className={className}>
      {imageEl}
      <div>
        {legend}
        {title}
        {descriptionEl}
      </div>
    </div>
  )
}

Panel.defaultProps = {
  image: "",
  imageAlt: "",
  legend: "",
  title: "Default",
  description: "",
}

Panel.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  legend: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.string,
}

export default Panel
