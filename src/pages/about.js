import PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const image = graphql`
  fragment image on File {
    childImageSharp {
      fluid(maxWidth: 200, maxHeight: 200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const images = graphql`
  query {
    gatsby: file(relativePath: { eq: "gatsby.png" }) {
      ...image
    }

    react: file(relativePath: { eq: "react.png" }) {
      ...image
    }

    graphql: file(relativePath: { eq: "graphql.png" }) {
      ...image
    }

    tailwind: file(relativePath: { eq: "tailwind.png" }) {
      ...image
    }

    markdown: file(relativePath: { eq: "markdown.png" }) {
      ...image
    }

    netlify: file(relativePath: { eq: "netlify.png" }) {
      ...image
    }
  }
`

const About = data => {
  const { data: images } = data

  return (
    <Layout>
      <SEO title="About" />
      <div>
        <h3>Made with:</h3>
        <ul>
          <li>
            <a href="https://www.gatsbyjs.org/" target="__blank">
              <Img
                fluid={images.gatsby.childImageSharp.fluid}
                alt="gatsby"
                className="h-5 w-5 mr-2 inline-block"
                placeholderClassName="mb-0"
              />
              Gatsby
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="https://reactjs.org/" target="__blank">
              <Img
                fluid={images.react.childImageSharp.fluid}
                alt="react"
                className="h-5 w-5 mr-2 inline-block"
                placeholderClassName="mb-0"
              />
              ReactJS
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="https://graphql.org/" target="__blank">
              <Img
                fluid={images.graphql.childImageSharp.fluid}
                alt="graphql"
                className="h-5 w-5 mr-2 inline-block"
                placeholderClassName="mb-0"
              />
              GraphQL
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="https://tailwindcss.com/" target="__blank">
              <Img
                fluid={images.tailwind.childImageSharp.fluid}
                alt="tailwind"
                className="h-5 w-5 mr-2 inline-block"
                placeholderClassName="mb-0"
              />
              Tailwind
            </a>
          </li>
          <li className="grid grid-flow-col gap-2">
            <a href="https://daringfireball.net/projects/markdown/" target="__blank">
              <Img
                fluid={images.markdown.childImageSharp.fluid}
                alt="markdown"
                className="h-5 w-5 mr-2 inline-block"
                placeholderClassName="mb-0"
              />
              Markdown
            </a>
          </li>
        </ul>
        <h3>Hosted on:</h3>
        <ul>
          <li className="grid grid-flow-col">
            <a href="https://www.netlify.com/" target="__blank">
              <Img
                fluid={images.netlify.childImageSharp.fluid}
                alt="netlify"
                className="h-5 w-5 mr-2 inline-block"
                placeholderClassName="mb-0"
              />
              Netlify
            </a>
          </li>
        </ul>
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
