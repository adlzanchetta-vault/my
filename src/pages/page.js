import React from "react";
import { graphql } from "gatsby";
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import BaseLayout from "../components/layout/BaseLayout";

import "../styles/page.css";

const PAGE_ID = "home";

const processHomeText = (rawHomeText) => {
  const splittedText = rawHomeText.split('\n');
  return ( <> {splittedText.map((txt, i) => (<p key={i}>{txt}</p>))} </> );
}

export default function Page() {

  const { t } = useTranslation();  // used for showing
  const { language, changeLanguage } = useI18next();

  return ( 
    <BaseLayout page_id={PAGE_ID} t={t} language={language} changeLanguage={changeLanguage}>
      <img src={`${process.env.GATSBY_BASE_URL}imgs/andre_horizontal.jpg`}
           className="home_pic"
           alt="Andre's face" />
      <h1>{t(PAGE_ID)}</h1>
      {processHomeText(t("home_content"))}
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
