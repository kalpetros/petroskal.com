import PropTypes from "prop-types"
import React from "react"

const Panel = ({ children }) => (
  <div className="bg-white p-4 flex flex-col justify-between leading-normal rounded-lg shadow-xl">
    <div className="mb-8">
      <p className="text-sm text-gray-600 flex items-center">22/05/2020</p>
      <div className="text-gray-900 font-bold text-xl mb-2">
        Can coffee make you a better developer?
      </div>
      <p className="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </p>
    </div>
  </div>
)

Panel.propTypes = {
  siteTitle: PropTypes.string,
}

Panel.defaultProps = {
  siteTitle: ``,
}

export default Panel
