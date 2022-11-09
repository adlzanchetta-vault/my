import React from "react";
import HeaderGrid from "./HeaderGrid";
import FooterGrid from "./Footer";

import "../styles/global.css";
import "../styles/layout.css";

export default function Layout( { children } ) {

    return (
        <>
            <HeaderGrid />
            <main><div className="content">{ children }</div></main>
            <FooterGrid />
        </>
    );

}

/*
// this commands defines how the GraphQL query must be executed
export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
*/