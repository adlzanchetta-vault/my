import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";

export default function Cv() {

  const { t } = useTranslation();  // used for showing
 
  return ( 
    <Layout>
      <p>
        <h1>{t("cv")}</h1>
      </p>
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
