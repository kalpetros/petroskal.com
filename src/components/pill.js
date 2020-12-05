import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Pill = props => {
  const { title, tooltip, url, icon, textColor, bgColor, bgHoverColor } = props

  const baseClassName = `bg-${bgColor} hover:bg-${bgHoverColor} text-${textColor} dark:bg-gray-800 dark:text-gray-400 relative inline-block p-2 font-semibold text-xs border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl`
  const className = tooltip ? `${baseClassName} has-tooltip` : baseClassName

  if (url !== "") {
    return (
      <a href={url} className={className}>
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
    <div className={className} data-tooltip={tooltip}>
      {icon !== "" ? <FontAwesomeIcon icon={icon} /> : title}
    </div>
  )
}

Pill.defaultProps = {
  title: "Pill",
  tooltip: "",
  url: "",
  icon: "",
  textColor: "gray-900",
  bgColor: "white",
  bgHoverColor: "white",
}

Pill.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.array,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
}
