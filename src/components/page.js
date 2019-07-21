import React from "react";
import Markdown from "react-markdown";
import { Link } from "gatsby";

const Page = (data) => {
  return (
    <>
    <h1>{data.frontmatter && data.frontmatter.title}</h1>
      <h2>
        <Link to="/">Home</Link>
      </h2>
      <Markdown>{data.body}</Markdown>
    </>
  );
};

export default Page;
