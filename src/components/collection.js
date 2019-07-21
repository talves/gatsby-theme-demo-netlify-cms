import React from "react";
import { Link } from "gatsby";

const Collection = ({ data }) => {
  return (
    <>
      <h2>
        <Link to="/">Home</Link>
      </h2>
      <ul>
        {data &&
          data.map(item => {
            return (
              <li>
                <Link to={item.slug}>{item.frontmatter.title}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Collection;
