import React from 'react';
import Helmet from 'react-helmet';

export default function Template({
  // A prop injected by the GraphQL query, to then be rendered by the template
  data}) {
    // Re-assign the data pulled with markdownRemark as post. const post = data.markdownRemark;
    const { markdownRemark: post } = data;

    // Access the markdown frontmatter you wrote in an md file
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    );
  }

  /* The query uses a back-ticks syntax like styled components.
  The query is a function that accepts a property of "path" that needs to be a string.
  Inside the query, search for given posts by the frontmatter's path with the help of markdownRemark,
  making sure it's equal to the path coming in.
  Tell it you want the blog post's html/interior, it's frontmatter title & path. */
  export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
      markdownRemark(frontmatter: { path: { eq: $path } }) {
        html
        frontmatter {
          path
          title
        }
      }
    }
  `
