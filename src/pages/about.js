import PropTypes from "prop-types"
import React from "react"

import { graphql } from "gatsby"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    site {
      siteMetadata {
        title
        twitter
        linkedin
        github
        stackoverflow
        email
      }
    }

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

const IconItem = props => {
  let className = "mr-2"

  if (props.iconColor) {
    className = `${className} ${props.iconColor}`
  }

  return (
    <li>
      <a href={props.url} target="__blank">
        <FontAwesomeIcon className={className} icon={props.icon} />
        {props.name}
      </a>
    </li>
  )
}

IconItem.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconColor: PropTypes.string,
  name: PropTypes.string.isRequired,
}

const ImageItem = props => (
  <li>
    <a href={props.url} target="__blank">
      <Img
        fluid={props.image}
        alt={props.imageAlt}
        className="h-5 w-5 mr-2 inline-block align-middle"
        placeholderClassName="mb-0"
      />
      {props.name}
    </a>
  </li>
)

ImageItem.propTypes = {
  url: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  name: PropTypes.string.isRequired,
}

const About = props => {
  return (
    <Layout>
      <SEO title="About" />
      <h3>Hey there!</h3>
      <p>
        I'm Petros. I'm currently living in Athens, Greece working as a Software
        Engineer for a travel tech startup.
      </p>
      <p>You can find me on:</p>
      <ul>
        <IconItem
          url={props.data.site.siteMetadata.twitter}
          icon={["fab", "twitter"]}
          iconColor="text-indigo-500"
          name="Twitter"
        />
        <IconItem
          url={props.data.site.siteMetadata.linkedin}
          icon={["fab", "linkedin"]}
          iconColor="text-indigo-700"
          name="Linkedin"
        />
      </ul>
      <hr />
      <h3>This website is made with:</h3>
      <ul>
        <ImageItem
          url="https://www.gatsbyjs.org/"
          image={props.data.gatsby.childImageSharp.fluid}
          imageAlt="gatsby"
          name="Gatsby"
        />
        <ImageItem
          url="https://reactjs.org/"
          image={props.data.react.childImageSharp.fluid}
          imageAlt="react"
          name="ReactJS"
        />
        <ImageItem
          url="https://graphql.org/"
          image={props.data.graphql.childImageSharp.fluid}
          imageAlt="graphql"
          name="GraphQL"
        />
        <ImageItem
          url="https://tailwindcss.com/"
          image={props.data.tailwind.childImageSharp.fluid}
          imageAlt="tailwind"
          name="Tailwind"
        />
        <ImageItem
          url="https://daringfireball.net/projects/markdown/"
          image={props.data.markdown.childImageSharp.fluid}
          imageAlt="markdown"
          name="Markdown"
        />
      </ul>
      <h3>and hosted on:</h3>
      <ul>
        <ImageItem
          url="https://www.netlify.com/"
          image={props.data.netlify.childImageSharp.fluid}
          imageAlt="netlify"
          name="Netlify"
        />
      </ul>
    </Layout>
  )
}

export default About
