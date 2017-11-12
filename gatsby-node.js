// This file with it's specific filename is used to register the blog post pages using the createPages API
const path = require('path');

// Gatsby uses redux to manage its state, which you have access to through its action creators with boundActionCreators
exports.createPages = ({ boundActionCreators, graphql }) => {
  // Pull out our createPage action from boundActionCreators
  const { createPage } = boundActionCreators;

  // Bring in the template file to use
  const postTemplate = path.resolve('src/templates/post.js');

  /* Query for all of the blog posts & create a page for any blog post found.
  "edge" is the node itself; by giving allMarkdownRemark edges, you're giving it all the useful data it needs to register pages
  Include error handling just in case. */
  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  }`).then(res => {
    if(res.errors) {
      return Promise.reject(res.errors);
    }

    /* If there are no errors, iterate through edges array grabbing the node object.
    createPage now has access to the path inside the post's frontmatter,
    & we pass the component defined above that we want it to render into. */
    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })
    })
  })
}
