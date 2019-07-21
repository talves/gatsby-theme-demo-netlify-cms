import React from "react";
import { graphql } from "gatsby";
import Collection from "../../components/collection";
import Extra from "../../components/extra-json";

/*
  Query here allows for shadowing components
*/
export const query = graphql`
  query KitchenSinkCollection {
    allKitchenSink {
      nodes {
        slug
        frontmatter {
          title
        }
      }
    }
  }
`;

const KitchenSink = props => {
  const { data } = props;
  const pageData = {
    data: data.allKitchenSink.nodes
  };
  return (
    <>
      <Collection {...pageData} />
      <Extra {...props} />
    </>
  );
};

export default KitchenSink;
