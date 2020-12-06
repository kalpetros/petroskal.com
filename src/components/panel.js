import PropTypes from "prop-types"
import React from "react"

const Panel = ({ children }) => {
  const colorClasses = `bg-gray-50 dark:bg-gray-700`
  const className = `${colorClasses} p-4 leading-normal rounded-xl`

  return <div className={className}>{children}</div>
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Panel
