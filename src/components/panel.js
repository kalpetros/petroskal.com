import PropTypes from "prop-types"
import React from "react"

import { Link } from "gatsby"

const Panel = props => (
  <div
    id={props.id}
    className="bg-white p-4 leading-normal rounded-lg shadow-lg"
  >
    <p className="text-sm text-gray-600 flex items-center">{props.legend}</p>
    <div className="text-gray-900 font-bold text-xl mb-2 cursor-pointer">
      <Link to={props.path}>{props.title}</Link>
    </div>
    <p className="text-gray-700 text-base">{props.description}</p>
  </div>
)

Panel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  legend: PropTypes.string,
  id: PropTypes.string.isRequired,
}

Panel.defaultProps = {
  title: `default`,
  description: `default`,
  path: `/`,
  legend: `default`,
  id: `1`,
}

export default Panel
