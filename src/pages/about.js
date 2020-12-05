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
  const { name, url, image, imageAlt, icon } = props

  return (
    <div
      className="flex bg-gray-100 dark:bg-gray-700 rounded-full h-12 w-12 items-center justify-center relative has-tooltip"
      data-tooltip={name}
    >
      <a className="underline" href={url} target="__blank">
        {icon ? (
          <FontAwesomeIcon className="text-gray-700" icon={props.icon} />
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
  name: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

const About = props => {
  return (
    <Layout>
      <SEO title="About" />
      <h1 className="text-gray-700 dark:text-gray-200">Hey there!</h1>
      <p className="text-gray-700 dark:text-gray-400">
        I'm Petros. I'm a software engineer passionate about the web, its future
        and how to build and deliver efficient, human-friendly and well tested
        software. I love rich user experiences and interfaces that scale and can
        be used with minimal effort.
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        I'm currently working with a semi-remote agile team in a travel
        technology startup.
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        When I'm away from the keyboard you will usually find me planning my
        next travel destination, creating music or picking up an intersting
        book.
      </p>
      <h3 className="text-gray-700 dark:text-gray-400">You can find me on:</h3>
      <div className="grid grid-flow-col auto-cols-max gap-2 mb-4 overflow-auto">
        <ImageItem
          name="Twitter"
          url={props.data.site.siteMetadata.twitter}
          icon={["fab", "twitter"]}
        />
        <ImageItem
          name="Linkedin"
          url={props.data.site.siteMetadata.linkedin}
          icon={["fab", "linkedin"]}
        />
        <ImageItem
          name="Github"
          url={props.data.site.siteMetadata.github}
          icon={["fab", "github"]}
        />
        <ImageItem
          name="Stackoverflow"
          url={props.data.site.siteMetadata.stackoverflow}
          icon={["fab", "stack-overflow"]}
        />
        <ImageItem
          name="Email"
          url={`mailto:${props.data.site.siteMetadata.email}`}
          icon="envelope-open"
        />
      </div>
      <h3 className="text-gray-700 dark:text-gray-400">
        This website is made with:
      </h3>
      <div className="grid grid-flow-col auto-cols-max gap-2 overflow-auto">
        <ImageItem
          name="Gatsby"
          url="https://www.gatsbyjs.org/"
          image={props.data.gatsby.childImageSharp.fluid}
          imageAlt="gatsby"
        />
        <ImageItem
          name="ReactJS"
          url="https://reactjs.org/"
          image={props.data.react.childImageSharp.fluid}
          imageAlt="react"
        />
        <ImageItem
          name="GraphQL"
          url="https://graphql.org/"
          image={props.data.graphql.childImageSharp.fluid}
          imageAlt="graphql"
        />
        <ImageItem
          name="Tailwind"
          url="https://tailwindcss.com/"
          image={props.data.tailwind.childImageSharp.fluid}
          imageAlt="tailwind"
        />
        <ImageItem
          name="Markdown"
          url="https://daringfireball.net/projects/markdown/"
          image={props.data.markdown.childImageSharp.fluid}
          imageAlt="markdown"
        />
        <ImageItem
          name="Netlify"
          url="https://www.netlify.com/"
          image={props.data.netlify.childImageSharp.fluid}
          imageAlt="netlify"
        />
      </div>
    </Layout>
  )
}

export default About
