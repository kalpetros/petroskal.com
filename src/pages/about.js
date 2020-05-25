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

const Item = props => (
  <li className="grid grid-flow-col gap-2">
    <a href={props.url} target="__blank">
      <Img
        fluid={props.imageSrc}
        alt={props.imageAlt}
        className="h-5 w-5 mr-2 inline-block align-middle"
        placeholderClassName="mb-0"
      />
      {props.name}
    </a>
  </li>
)

Item.propTypes = {
  url: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  name: PropTypes.string.isRequired
}

const About = data => {
  const { data: images } = data

  return (
    <Layout>
      <SEO title="About" />
      <div>
        <h3>Made with:</h3>
        <ul>
          <Item
            url="https://www.gatsbyjs.org/"
            imageSrc={images.gatsby.childImageSharp.fluid}
            imageAlt="gatsby"
            name="Gatsby"
          />
          <Item
            url="https://reactjs.org/"
            imageSrc={images.react.childImageSharp.fluid}
            imageAlt="react"
            name="ReactJS"
          />
          <Item
            url="https://graphql.org/"
            imageSrc={images.graphql.childImageSharp.fluid}
            imageAlt="graphql"
            name="GraphQL"
          />
          <Item
            url="https://tailwindcss.com/"
            imageSrc={images.tailwind.childImageSharp.fluid}
            imageAlt="tailwind"
            name="Tailwind"
          />
          <Item
            url="https://daringfireball.net/projects/markdown/"
            imageSrc={images.markdown.childImageSharp.fluid}
            imageAlt="markdown"
            name="Markdown"
          />
        </ul>
        <h3>Hosted on:</h3>
        <ul>
          <Item
            url="https://www.netlify.com/"
            imageSrc={images.netlify.childImageSharp.fluid}
            imageAlt="netlify"
            name="Netlify"
          />
        </ul>
      </div>
    </Layout>
  )
}

export default About
