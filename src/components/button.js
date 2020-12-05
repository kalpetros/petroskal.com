import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Button = props => {
  const { title, icon, bgColor, bgHoverColor, textColor } = props
  const bgColorClass =
    bgColor !== "" ? `bg-${bgColor}` : "bg-gray-100 dark:bg-transparent"
  const bgHoverColorClass =
    bgHoverColor !== ""
      ? `hover:bg-${bgHoverColor}`
      : "hover:bg-gray-200 dark:hover:bg-gray-700"
  const textColorClass =
    textColor !== ""
      ? `text-${textColor}`
      : "text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
  const colorClasses = `${bgColorClass} ${bgHoverColorClass} ${textColorClass}`

  return (
    <button
      className={`${colorClasses} py-2 px-4 font-semibold rounded-lg focus:outline-none no-underline hover:no-underline`}
    >
      {icon.length > 0 ? <FontAwesomeIcon icon={icon} /> : title}
    </button>
  )
}

Button.defaultProps = {
  title: "Button",
  icon: [],
  bgColor: "",
  bgHoverColor: "",
  textColor: "",
}

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.array,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  textColor: PropTypes.string,
}
