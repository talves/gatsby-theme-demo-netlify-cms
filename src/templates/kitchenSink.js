import React from 'react'
import { graphql } from 'gatsby'
import Page from '../components/page'
import Extra from '../components/extra-json'

/*
  Query here allows for shadowing components
*/
export const query = graphql`
query ($name: String!) {
  kitchenSink(name: {eq: $name}) {
    slug
    frontmatter {
      title
    }
    rawBody
    name
  }
}
`

const KitchenSink = (props) => {
  const { data } = props
  const pageData = {
    ...data.kitchenSink,
  }
  return (
    <>
      <Page {...pageData} />
      <Extra {...props} />
    </>
  )
}

export default KitchenSink
