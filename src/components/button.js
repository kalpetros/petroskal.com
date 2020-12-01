import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Button = props => {
  const { title, icon, textColor, bgColor, bgHoverColor } = props
  return (
    <button
      className={`py-2 px-4 font-semibold rounded-lg text-${textColor} bg-${bgColor} hover:bg-${bgHoverColor} no-underline hover:no-underline`}
    >
      {icon !== "" ? <FontAwesomeIcon icon={icon} /> : title}
    </button>
  )
}

Button.defaultProps = {
  title: "Button",
  icon: "",
  textColor: "white",
  bgColor: "indigo-300",
  bgHoverColor: "indigo-400",
}

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.array,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
}
