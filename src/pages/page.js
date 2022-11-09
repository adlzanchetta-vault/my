import React from "react";
import { graphql } from "gatsby";
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import { base_url } from "../env/globals"
import Layout from "../components/Layout";

import "../styles/page.css";

export default function Page() {

  const { t } = useTranslation();  // used for showing
  const { language, changeLanguage } = useI18next();

  return ( 
    <Layout>
      <img src={`${base_url}imgs/andre_horizontal.jpg`} className="home_pic" />
      <p>
        <h1>{t("home")}</h1>
      </p>
      <p>
        <ul>
          <li onClick={() => { changeLanguage('en') }} >EN</li>
          <li onClick={() => { changeLanguage('es') }} >ES</li>
        </ul>
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
