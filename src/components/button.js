import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Button = props => {
  const {
    title,
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
  const className = `${colorClasses} py-2 px-4 font-semibold rounded-lg focus:outline-none no-underline hover:no-underline`

  if (to !== "") {
    return (
      <Link className={className} to={to}>
        {icon.length > 0 ? <FontAwesomeIcon icon={icon} /> : title}
      </Link>
    )
  }
  return (
    <button className={className} type={type} form={form} onClick={onClick}>
      {icon.length > 0 ? <FontAwesomeIcon icon={icon} /> : title}
    </button>
  )
}

Button.defaultProps = {
  title: "Button",
  type: "",
  form: "",
  to: "",
  icon: [],
  bgColor: "",
  bgHoverColor: "",
  textColor: "",
}

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  form: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.array,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
