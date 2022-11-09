import React from "react";
import { graphql } from "gatsby";
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import { base_url } from "../env/globals"
import Layout from "../components/Layout";
import Page from "./page";

export default Page;


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
