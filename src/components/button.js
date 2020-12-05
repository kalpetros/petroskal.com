import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Button = props => {
  const { title, icon, textColor, bgColor, bgHoverColor } = props
  return (
    <button
      className={`py-2 px-4 font-semibold rounded-lg text-${textColor} bg-${bgColor} hover:bg-${bgHoverColor} dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400 focus:outline-none no-underline hover:no-underline`}
    >
      {icon !== "" ? <FontAwesomeIcon icon={icon} /> : title}
    </button>
  )
}

Button.defaultProps = {
  title: "Button",
  icon: "",
  textColor: "white",
  bgColor: "gray-100",
  bgHoverColor: "gray-200",
}

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.array,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
}
