import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const LinkButton = props => {
  const { url, title, icon, textColor, bgColor, bgHoverColor } = props
  return (
    <a
      href={url}
      className={`py-2 px-4 font-semibold rounded-lg text-${textColor} bg-${bgColor} hover:bg-${bgHoverColor} no-underline hover:no-underline`}
    >
      {icon !== "" ? <FontAwesomeIcon icon={icon} /> : title}
    </a>
  )
}

LinkButton.defaultProps = {
  title: "Link Button",
  url: "",
  icon: "",
  textColor: "white",
  bgColor: "indigo-300",
  bgHoverColor: "indigo-400",
}

LinkButton.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.array,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
}
