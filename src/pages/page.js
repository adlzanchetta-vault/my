import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "./common/Layout";

import "../styles/page.css";

export default function Page() {

  const { t } = useTranslation();  // used for showing

  return ( 
    <Layout>
      <img src={`${process.env.GATSBY_BASE_URL}imgs/andre_horizontal.jpg`}
           className="home_pic"
           alt="Andre's face" />
      <h1>{t("home")}</h1>
      <p>
        {t("home_content")}
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
