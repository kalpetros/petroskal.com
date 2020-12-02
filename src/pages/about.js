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

const ImageItem = props => {
  const { url, image, imageAlt, icon, iconColor } = props

  return (
    <div className="flex bg-gray-100 rounded-full h-12 w-12 items-center justify-center">
      <a className="underline" href={url} target="__blank">
        {icon ? (
          <FontAwesomeIcon className={iconColor} icon={props.icon} />
        ) : image ? (
          <Img
            fluid={image}
            alt={imageAlt}
            className="h-5 w-5"
            placeholderClassName="mb-0"
          />
        ) : null}
      </a>
    </div>
  )
}

ImageItem.propTypes = {
  url: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  icon: PropTypes.array,
  iconColor: PropTypes.string,
  name: PropTypes.string,
}

const About = props => {
  return (
    <Layout>
      <SEO title="About" />
      <h1>Hey there!</h1>
      <p>
        I'm Petros. I'm currently living in Athens, Greece working as a Software
        Engineer for a travel tech startup.
      </p>
      <h3>You can find me on:</h3>
      <div className="grid grid-flow-col auto-cols-max gap-2 mb-4">
        <ImageItem
          url={props.data.site.siteMetadata.twitter}
          icon={["fab", "twitter"]}
          iconColor="text-indigo-500"
          name="Twitter"
        />
        <ImageItem
          url={props.data.site.siteMetadata.linkedin}
          icon={["fab", "linkedin"]}
          iconColor="text-indigo-700"
          name="Linkedin"
        />
      </div>
      <h3>This website is made with:</h3>
      <div className="grid grid-flow-col auto-cols-max gap-2">
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
        <ImageItem
          url="https://www.netlify.com/"
          image={props.data.netlify.childImageSharp.fluid}
          imageAlt="netlify"
          name="Netlify"
        />
      </div>
    </Layout>
  )
}

export default About
