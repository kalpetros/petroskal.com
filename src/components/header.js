import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = ({ siteTitle }) => (
  <header>
    <nav className="grid grid-cols-2 p-6 items-center">
      <div>
        <Link to="/">
          <img
            className="flex-shrink-0 h-12 rounded-full mb-0 pb-0"
            src="https://avatars2.githubusercontent.com/u/5626758?s=460&v=4"
            alt=""
          />
        </Link>
      </div>
      <div className="">
        <div className="grid grid-flow-col text-right">
          <a
            href="https://github.com/kalpetros"
            className="cursor-pointer"
            target="__blank"
          >
            <FontAwesomeIcon icon={["fab", "github"]} />
          </a>
          <a
            href="https://twitter.com/kalpetross"
            className="cursor-pointer"
            target="__blank"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <a
            href="https://www.linkedin.com/in/kalpetros/"
            className="cursor-pointer"
            target="__blank"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </a>
          <a
            href="https://stackoverflow.com/users/2005799/kalpetros"
            className="cursor-pointer"
            target="__blank"
          >
            <FontAwesomeIcon icon={["fab", "stack-overflow"]} />
          </a>
          <a href="/" className="cursor-pointer" target="__blank">
            <FontAwesomeIcon icon="envelope-open" />
          </a>
        </div>
      </div>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
