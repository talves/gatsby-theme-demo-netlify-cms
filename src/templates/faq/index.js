import React from "react";
import { graphql } from "gatsby";
import Collection from "../../components/collection";
import Extra from "../../components/extra-json";

/*
  Query here allows for shadowing components
*/
export const query = graphql`
  query FaqCollection {
    allFaq {
      nodes {
        slug
        frontmatter {
          title
        }
      }
    }
  }
`;

const Faq = props => {
  const { data } = props;
  const pageData = {
    data: data.allFaq.nodes
  };
  return (
    <>
      <Collection {...pageData} />
      <Extra {...props} />
    </>
  );
};

export default Faq;
