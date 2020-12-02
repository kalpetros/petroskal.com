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
  const shadowClass = shadow ? "shadow-md" : null

  if (image) {
    imageEl = (
      <div className="flex-shrink-0 mr-6 h-12 w-12 rounded-full overflow-hidden">
        <img className="mb-0 grayscale" src={image} alt={imageAlt} />
      </div>
    )
  }

  return (
    <div
      id={id}
      className={`flex bg-white p-4 leading-normal rounded-lg ${shadowClass}`}
      // className="bg-gray-100 rounded-xl p-4 mb-4 grid grid-cols-2 gap-4 items-center"
    >
      {imageEl}
      <div>
        {legend}
        <div className="mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
          {url !== "" ? (
            <a href={url} target="__blank">
              {title}
            </a>
          ) : (
            <Link to={path}>{title}</Link>
          )}
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
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
