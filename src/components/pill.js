import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Pill = props => {
  const {
    title,
    tooltip,
    url,
    icon,
    textColor,
    bgColor,
    bgHoverColor,
    borderColor,
  } = props

  const bgColorClass =
    bgColor !== "" ? `bg-${bgColor}` : "bg-white dark:bg-gray-800"
  const bgHoverColorClass =
    bgHoverColor !== ""
      ? `hover:bg-${bgHoverColor}`
      : "hover:bg-white dark:hover:bg-gray-800"
  const textColorClass =
    textColor !== "" ? `text-${textColor}` : "text-gray-700 dark:text-gray-200"
  const borderColorClass =
    borderColor !== ""
      ? `border-${borderColor}`
      : "border-gray-200 dark:border-gray-700"

  const colorClasses = `${bgColorClass} ${bgHoverColorClass} ${textColorClass} ${borderColorClass}`
  const baseClassName = `${colorClasses} relative inline-block p-2 font-semibold text-xs border shadow-sm rounded-xl`
  const className = tooltip ? `${baseClassName} has-tooltip` : baseClassName

  if (url !== "") {
    return (
      <a href={url} className={className}>
        {icon.length > 0 && title !== "" ? (
          <>
            <FontAwesomeIcon className="mr-1" icon={icon} />
            {title}
          </>
        ) : icon.length > 0 ? (
          <FontAwesomeIcon icon={icon} />
        ) : (
          title
        )}
      </a>
    )
  }

  return (
    <div className={className} data-tooltip={tooltip}>
      {icon.length > 0 ? <FontAwesomeIcon icon={icon} /> : title}
    </div>
  )
}

Pill.defaultProps = {
  title: "Pill",
  tooltip: "",
  url: "",
  icon: [],
  textColor: "",
  bgColor: "",
  bgHoverColor: "",
  borderColor: "",
}

Pill.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.array,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  borderColor: PropTypes.string,
}
