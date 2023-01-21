import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "./common/Layout";

const PAGE_ID = "portfolio";

export default function Portfolio() {

  const { t } = useTranslation();  // used for showing
 
  return ( 
    <Layout title={t(PAGE_ID)} page_id={PAGE_ID}>
      <p>
        TODO
      </p>
    </Layout>
  )
  
}


// this commands defines how the GraphQL query must be executed
// must be present is all pages that use i18next
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
