import React from 'react'
import { graphql } from 'gatsby'
import Page from '../components/page'
import Extra from '../components/extra-json'

/*
  Query here allows for shadowing components
*/
export const query = graphql`
query ($name: String!) {
  posts(name: {eq: $name}) {
    body
    frontmatter {
      date
      image
      title
    }
    name
    slug
  }
}
`

const Posts = (props) => {
  const { data } = props
  const pageData = {
    ...data.posts,
  }
  return (
    <>
      <Page {...pageData} />
      <Extra {...props} />
    </>
  )
}

export default Posts
