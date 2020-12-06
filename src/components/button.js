import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Button = props => {
  const {
    title,
    url,
    tooltip,
    type,
    form,
    to,
    icon,
    bgColor,
    bgHoverColor,
    textColor,
    onClick,
  } = props
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
  const baseClassName = `${colorClasses} py-2 px-4 font-semibold rounded-lg focus:outline-none no-underline hover:no-underline relative`
  const className = tooltip ? `${baseClassName} has-tooltip` : baseClassName

  if (/^(https|http|www|mailto)/.test(url)) {
    return (
      <a href={url} className={className} data-tooltip={tooltip}>
        {icon.length > 0 ? <FontAwesomeIcon icon={icon} /> : title}
      </a>
    )
  }

  if (to !== "") {
    return (
      <Link className={className} to={to} data-tooltip={tooltip}>
        {icon.length > 0 ? <FontAwesomeIcon icon={icon} /> : title}
      </Link>
    )
  }

  return (
    <button
      className={className}
      type={type}
      form={form}
      data-tooltip={tooltip}
      onClick={onClick}
    >
      {icon.length > 0 ? <FontAwesomeIcon icon={icon} /> : title}
    </button>
  )
}

Button.defaultProps = {
  title: "Button",
  url: "",
  tooltip: "",
  type: "",
  form: "",
  to: "",
  icon: "",
  bgColor: "",
  bgHoverColor: "",
  textColor: "",
}

Button.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  tooltip: PropTypes.string,
  type: PropTypes.string,
  form: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
