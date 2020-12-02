import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Pill } from "../components/pill"

export const data = graphql`
  query allMarkdownRemarkaAndBlogPostPyPath($path: String!) {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            path
            title
          }
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`

const BlogPostTemplate = ({ data, allData }) => {
  const { markdownRemark: blogPost, allMarkdownRemark: blogPosts } = data

  const date = blogPost.frontmatter.date
  const readingTime = blogPost.fields.readingTime.text
  const title = blogPost.frontmatter.title
  const path = blogPost.frontmatter.path
  const url = `https://www.petroskal.com${path}`
  const tweet = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
  const currentArticle = blogPosts.edges.findIndex(
    e => e.node.id === blogPost.id
  )
  const previousArticle = blogPosts.edges[currentArticle - 1]
  const nextArticle = blogPosts.edges[currentArticle + 1]
  let previousArticleLink = null
  let nextArticleLink = null
  const legend = (
    <div className="grid grid-flow-col auto-cols-max gap-2 mb-4">
      <Pill title={date} />
      <Pill title={readingTime} />
      <Pill
        url={tweet}
        icon={["fab", "twitter"]}
        title="Tweet"
        textColor="white"
        bgColor="indigo-300"
        bgHoverColor="indigo-400"
      />
    </div>
  )

  if (previousArticle) {
    previousArticleLink = (
      <Link to={previousArticle.node.frontmatter.path} className="text-sm">
        <FontAwesomeIcon icon="long-arrow-alt-left" />{" "}
        {previousArticle.node.frontmatter.title}
      </Link>
    )
  }

  if (nextArticle) {
    nextArticleLink = (
      <Link to={nextArticle.node.frontmatter.path} className="text-sm">
        {nextArticle.node.frontmatter.title}{" "}
        <FontAwesomeIcon icon="long-arrow-alt-right" />
      </Link>
    )
  }

  return (
    <Layout>
      <SEO title={blogPost.frontmatter.title} />
      <p className="font-bold">{legend}</p>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.html }} />
      <hr />
      <div className="grid grid-cols-2 py-4">
        <div>{previousArticleLink}</div>
        <div className="text-right">{nextArticleLink}</div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate
