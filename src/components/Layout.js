import React from "react";
import HeaderGrid from "./HeaderGrid";
import FooterGrid from "./Footer";
import { Helmet } from "react-helmet";

import "../styles/global.css";
import "../styles/layout.css";

export default function Layout( { title, children } ) {
    return (
        <>
            <Helmet>
                <title>{ process.env.GATSBY_PAGE_TITLE }</title>
            </Helmet>
            <HeaderGrid />
            <main>
                <div className="content">
                  {title ? (<h1>{title}</h1>) : <></>}
                  { children }
                </div>
            </main>
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