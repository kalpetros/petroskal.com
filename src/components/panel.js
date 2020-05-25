import PropTypes from "prop-types"
import React from "react"

import { Link } from "gatsby"

const Panel = props => {
  let image = null

  if (props.image) {
    image = (
      <div className="flex-shrink-0 mr-6">
        <img
          className="rounded-lg w-56 mb-0"
          src={props.image}
          alt={props.imageAlt}
        />
      </div>
    )
  }

  return (
    <div id={props.id} className="flex bg-white p-4 leading-normal rounded-lg shadow-md">
      {image}
      <div>
        <p className="text-sm font-bold">
          {props.legend}
        </p>
        <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
          <Link to={props.path}>{props.title}</Link>
        </div>
        <p className="mt-2 text-gray-600">{props.description}</p>
      </div>
    </div>
  )
}

Panel.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  legend: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  id: PropTypes.string.isRequired,
}

Panel.defaultProps = {
  image: "",
  imageAlt: "",
  legend: `default`,
  title: `default`,
  description: `default`,
  path: `/`,
  id: `1`,
}

export default Panel
