import PropTypes from "prop-types"
import React from "react"

export const Pill = props => {
  const { title } = props

  return (
    <div className="bg-white inline-block p-2 font-semibold text-xs border border-gray-200 shadow-sm rounded-xl">
      {title}
    </div>
  )
}

Pill.defaultProps = {
  title: "Pill",
}

Pill.propTypes = {
  title: PropTypes.string,
}
