import PropTypes from "prop-types"
import React from "react"

import Panel from "./panel"

const list = Array(5)
  .fill(1)
  .map(i => {
    return (
      <div className="mb-4">
        <Panel />
      </div>
    )
  })

const Articles = ({ children }) => (
  <div className="container mx-auto">{list}</div>
)

Articles.propTypes = {
  siteTitle: PropTypes.string,
}

Articles.defaultProps = {
  siteTitle: ``,
}

export default Articles
