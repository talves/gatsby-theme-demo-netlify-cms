import React from "react";
import { graphql } from "gatsby";
import Collection from "../../components/collection";
import Extra from "../../components/extra-json";

/*
  Query here allows for shadowing components
*/
export const query = graphql`
  query PostsCollection {
    allPosts {
      nodes {
        name
        internal {
          type
        }
        frontmatter {
          title
        }
      }
    }
  }
`;

const Posts = props => {
  const { data } = props;
  const pageData = {
    data: data.allPosts.nodes
  };
  return (
    <>
      <Collection {...pageData} />
      <Extra {...props} />
    </>
  );
};

export default Posts;
