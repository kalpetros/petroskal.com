/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  Array(5)
    .fill(1)
    .forEach((i, z) => {
      createPage({
        path: `/my-sweet-new-page-${z}/`,
        component: path.resolve(`./src/components/article.js`),
        // The context is passed as props to the component as well
        // as into the component's GraphQL query.
        context: {
          id: `123456`,
        },
      })
    })
}
