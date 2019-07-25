import React from "react";
import { graphql } from "gatsby";
import Page from "../components/page";
import Extra from "../components/extra-json";

/*
  Query here allows for shadowing components
*/
export const query = graphql`
  query($name: String!) {
    faq(name: { eq: $name }) {
      name
      slug
      rawBody
      frontmatter {
        title
      }
    }
  }
`;

const Faq = props => {
  const { data } = props;
  const pageData = {
    ...data.faq
  };
  return (
    <>
      <Page {...pageData} />
      <Extra {...props} />
    </>
  );
};

export default Faq;
