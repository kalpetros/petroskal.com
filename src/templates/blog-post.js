import React, { useState } from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pill from "../components/pill"
import Button from "../components/button"
import Panel from "../components/panel"

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

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark: blogPost, allMarkdownRemark: blogPosts } = data
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState("")

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
  let subscriptionEl = null

  const handleSubmit = event => {
    event.preventDefault()
    addToMailchimp(email)
      .then(data => {
        setSubscribed(data)
      })
      .catch(error => {
        setSubscribed(data)
      })
  }

  const handleChange = event => {
    setEmail(event.currentTarget.value)
  }

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
        borderColor="transparent"
      />
    </div>
  )

  if (previousArticle) {
    previousArticleLink = (
      <Link
        className="text-sm text-gray-700 dark:text-gray-400"
        to={previousArticle.node.frontmatter.path}
      >
        <FontAwesomeIcon icon="long-arrow-alt-left" />{" "}
        {previousArticle.node.frontmatter.title}
      </Link>
    )
  }

  if (nextArticle) {
    nextArticleLink = (
      <Link
        className="text-sm text-gray-700 dark:text-gray-400"
        to={nextArticle.node.frontmatter.path}
      >
        {nextArticle.node.frontmatter.title}{" "}
        <FontAwesomeIcon icon="long-arrow-alt-right" />
      </Link>
    )
  }

  if (subscribed !== "") {
    if (subscribed.result === "error") {
      subscriptionEl = (
        <p
          className="text-red-400"
          dangerouslySetInnerHTML={{ __html: subscribed.msg }}
        ></p>
      )
    } else {
      subscriptionEl = (
        <p className="text-gray-700 dark:text-gray-400">{subscribed.msg}</p>
      )
    }
  }

  return (
    <Layout>
      <SEO title={blogPost.frontmatter.title} />
      {legend}
      <h1 className="text-gray-700 dark:text-gray-200">{title}</h1>
      <div
        className="text-gray-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: blogPost.html }}
      />
      <div className="mt-8">
        <Panel>
          <div className="text-center">
            <h1 className="text-gray-400 dark:text-gray-200">Newsletter</h1>
            <p className="text-gray-700 dark:text-gray-400">
              Get notified about new posts!
            </p>
            {subscriptionEl}
            <form id="newsletter" onSubmit={handleSubmit}>
              <input
                className="text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:bg-gray-600 appearance-none border border-transparent w-full py-2 px-4 bg-white rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                type="email"
                placeholder="Your email address"
                value={email}
                required
                onChange={handleChange}
              />
              <div className="mt-8">
                <Button
                  title="Subscribe"
                  type="submit"
                  form="newsletter"
                  bgColor="gray-500"
                  bgHoverColor="gray-600"
                  textColor="white"
                />
              </div>
            </form>
          </div>
        </Panel>
      </div>
      <div className="grid grid-cols-2 py-4">
        <div>{previousArticleLink}</div>
        <div className="text-right">{nextArticleLink}</div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate
