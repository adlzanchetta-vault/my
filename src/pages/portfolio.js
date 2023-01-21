import React from "react";
import { graphql } from "gatsby";
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import BaseLayout from "../components/layout/BaseLayout";

import "../styles/portfolio.css";

const PAGE_ID = "portfolio";

export default function Portfolio() {

  const { t } = useTranslation();  // used for showing
  const { language, changeLanguage } = useI18next();
  
  return (
    <BaseLayout title={t(PAGE_ID)} page_id={PAGE_ID} t={t} language={language} changeLanguage={changeLanguage}>
      <p>
        {t("under_construction")}
      </p>
    </BaseLayout>
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
