import PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import gatsbyImg from "../images/gatsby.png"
import reactImg from "../images/react.png"
import graphqlImg from "../images/graphql.png"
import tailwindImg from "../images/tailwind.png"
import markdownImg from "../images/markdown.png"
import netlifyImg from "../images/netlify.png"

export const data = graphql`
  query Images {
    allImageSharp {
      edges {
        node {
          id
          fluid {
            src
            originalName
          }
        }
      }
    }
  }
`

const About = data => {
  console.log(data)
  return (
    <Layout>
      <SEO title="About" />
      <div>
        <h3>Made with:</h3>
        <ul>
          <li>
            <a href="https://www.gatsbyjs.org/" target="__blank">
              <img
                className="flex-shrink-0 h-5 mb-0 pb-0 mr-2 inline-block"
                src={gatsbyImg}
                alt="gatsby.png"
              />
              Gatsby
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="https://reactjs.org/" target="__blank">
              <img
                className="flex-shrink-0 h-5 mb-0 pb-0 mr-2 inline-block"
                src={reactImg}
                alt="avatar"
              />
              ReactJS
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="https://graphql.org/" target="__blank">
              <img
                className="flex-shrink-0 h-5 mb-0 pb-0 mr-2 inline-block"
                src={graphqlImg}
                alt="avatar"
              />
              GraphQL
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="https://tailwindcss.com/" target="__blank">
              <img
                className="flex-shrink-0 h-5 mb-0 pb-0 mr-2 inline-block"
                src={tailwindImg}
                alt="avatar"
              />
              Tailwind
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="" target="__blank">
              <img
                className="flex-shrink-0 h-5 mb-0 pb-0 mr-2 inline-block"
                src={markdownImg}
                alt="avatar"
              />
              Markdown
            </a>
          </li>
        </ul>
        <h3>Hosted on:</h3>
        <ul>
          <li className="grid grid-flow-col">
            <a href="https://www.netlify.com/" target="__blank">
              <img
                className="flex-shrink-0 h-5 mb-0 pb-0 mr-2 inline-block"
                src={netlifyImg}
                alt="avatar"
              />
              Netlify
            </a>
          </li>
        </ul>
        <h3>
          Fork this website{" "}
          <a
            href="https://github.com/kalpetros/kalpetros.github.io"
            target="__blank"
          >
            here.
          </a>
        </h3>
      </div>
    </Layout>
  )
}

About.propTypes = {
  siteTitle: PropTypes.string,
}

About.defaultProps = {
  siteTitle: ``,
}

export default About
