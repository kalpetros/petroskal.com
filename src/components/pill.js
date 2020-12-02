import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Pill = props => {
  const { title, url, icon, textColor, bgColor, bgHoverColor } = props

  if (url) {
    return (
      <a
        href={url}
        className={`bg-${bgColor} hover:bg-${bgHoverColor} text-${textColor} inline-block p-2 font-semibold text-xs border border-gray-200 shadow-sm rounded-xl`}
      >
        {icon !== "" && title !== "" ? (
          <>
            <FontAwesomeIcon className="mr-1" icon={icon} />
            {title}
          </>
        ) : icon !== "" ? (
          <FontAwesomeIcon icon={icon} />
        ) : (
          title
        )}
      </a>
    )
  }

  return (
    <div
      className={`bg-${bgColor} hover:bg-${bgHoverColor} text-${textColor} inline-block p-2 font-semibold text-xs border border-gray-200 shadow-sm rounded-xl`}
    >
      {icon !== "" ? <FontAwesomeIcon icon={icon} /> : title}
    </div>
  )
}

Pill.defaultProps = {
  title: "Pill",
  url: "",
  icon: "",
  textColor: "gray-900",
  bgColor: "white",
  bgHoverColor: "white",
}

Pill.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.array,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
}
