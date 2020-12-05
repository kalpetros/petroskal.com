import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Panel = props => {
  const {
    image,
    imageAlt,
    legend,
    title,
    description,
    path,
    url,
    id,
    shadow,
  } = props
  let imageEl = null
  const shadowClass = shadow ? null : null
  const colorClasses = `bg-white dark:bg-gray-700 dark:border-transparent`
  const className = `${colorClasses} ${shadowClass} flex p-4 border-b leading-normal rounded-lg`
  const linkClassName =
    "text-gray-700 dark:text-gray-200 text-2xl leading-tight font-semibold hover:underline"

  if (image) {
    imageEl = (
      <div className="flex-shrink-0 mr-6 h-12 w-12 rounded-full overflow-hidden">
        <img className="mb-0 grayscale" src={image} alt={imageAlt} />
      </div>
    )
  }

  return (
    <div id={id} className={className}>
      {imageEl}
      <div>
        {legend}
        {url !== "" ? (
          <a className={linkClassName} href={url} target="__blank">
            {title}
          </a>
        ) : (
          <Link className={linkClassName} to={path}>
            {title}
          </Link>
        )}
        <p className="text-gray-700 dark:text-gray-400 mt-2">{description}</p>
      </div>
    </div>
  )
}

Panel.defaultProps = {
  image: "",
  imageAlt: "",
  legend: "",
  title: "default",
  description: "",
  path: "/",
  url: "",
  id: "1",
}

Panel.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  legend: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string.isRequired,
}

export default Panel
