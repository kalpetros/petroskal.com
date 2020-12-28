import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import IconItem from "../components/icon-item"
import Panel from "../components/panel"

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
        github
        keybase
        twitter
        linkedin
        stackoverflow
        email
      }
    }

    github: file(relativePath: { eq: "github.svg" }) {
      publicURL
    }

    keybase: file(relativePath: { eq: "keybase.svg" }) {
      publicURL
    }

    twitter: file(relativePath: { eq: "twitter.svg" }) {
      publicURL
    }

    linkedin: file(relativePath: { eq: "linkedin.svg" }) {
      publicURL
    }

    stackoverflow: file(relativePath: { eq: "stackoverflow.svg" }) {
      publicURL
    }

    gatsby: file(relativePath: { eq: "gatsby.svg" }) {
      publicURL
    }

    react: file(relativePath: { eq: "react.svg" }) {
      publicURL
    }

    graphql: file(relativePath: { eq: "graphql.svg" }) {
      publicURL
    }

    tailwind: file(relativePath: { eq: "tailwindcss.svg" }) {
      publicURL
    }

    markdown: file(relativePath: { eq: "markdown.svg" }) {
      publicURL
    }

    netlify: file(relativePath: { eq: "netlify.svg" }) {
      publicURL
    }
  }
`

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
        next travel destination, creating music or picking up{" "}
        <Link to="/books" className="text-indigo-500" target="__blank">
          an interesting book
        </Link>
        .
      </p>
      <h3 className="text-gray-700 dark:text-gray-400">You can find me on:</h3>
      <div className="grid grid-flow-col auto-cols-max gap-2 mb-4">
        <IconItem
          name="Github"
          url={props.data.site.siteMetadata.github}
          image={props.data.github.publicURL}
        />
        <IconItem
          name="Keybase"
          url={props.data.site.siteMetadata.keybase}
          image={props.data.keybase.publicURL}
        />
        <IconItem
          name="Twitter"
          url={props.data.site.siteMetadata.twitter}
          image={props.data.twitter.publicURL}
        />
        <IconItem
          name="Linkedin"
          url={props.data.site.siteMetadata.linkedin}
          image={props.data.linkedin.publicURL}
        />
        <IconItem
          name="Stackoverflow"
          url={props.data.site.siteMetadata.stackoverflow}
          image={props.data.stackoverflow.publicURL}
        />
      </div>
      <div>
        <div className="mb-4">
          <Panel>
            <div className="font-semibold">Email</div>
            <div>kalpetros at pm dot me</div>
          </Panel>
        </div>
        <div className="mb-4">
          <Panel>
            <div className="font-semibold">PGP Signature</div>
            <div className="uppercase">CBFD 8362 5C61 8509</div>
          </Panel>
        </div>
      </div>
      <h3 className="text-gray-700 dark:text-gray-400">
        This website is made with:
      </h3>
      <div className="grid grid-flow-col auto-cols-max gap-2">
        <IconItem
          name="Gatsby"
          url="https://www.gatsbyjs.org/"
          image={props.data.gatsby.publicURL}
          imageAlt="gatsby"
        />
        <IconItem
          name="ReactJS"
          url="https://reactjs.org/"
          image={props.data.react.publicURL}
          imageAlt="react"
        />
        <IconItem
          name="GraphQL"
          url="https://graphql.org/"
          image={props.data.graphql.publicURL}
          imageAlt="graphql"
        />
        <IconItem
          name="Tailwind"
          url="https://tailwindcss.com/"
          image={props.data.tailwind.publicURL}
          imageAlt="tailwind"
        />
        <IconItem
          name="Markdown"
          url="https://daringfireball.net/projects/markdown/"
          image={props.data.markdown.publicURL}
          imageAlt="markdown"
        />
        <IconItem
          name="Netlify"
          url="https://www.netlify.com/"
          image={props.data.netlify.publicURL}
          imageAlt="netlify"
        />
      </div>
    </Layout>
  )
}

export default About
