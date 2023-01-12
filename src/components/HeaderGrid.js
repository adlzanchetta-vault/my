import React from "react"
import { graphql } from "gatsby"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import "../styles/header_grid.css";

function PagesListing () {
  const { t } = useTranslation();

  return (
  <ul className="menu-pages-list">
    <li><a href={`${process.env.GATSBY_BASE_URL}portfolio`}>{t("portfolio")}</a></li>
    <li><a href={`${process.env.GATSBY_BASE_URL}cv`}>{t("cv")}</a></li>
    <li><a href={`${process.env.GATSBY_BASE_URL}contact`}>{t("contact")}</a></li>
  </ul>);
}

function LanguageListing () {
  const { changeLanguage } = useI18next();

  const loggedLangChange = (lang) => {
    return () => { changeLanguage(lang); }
  }

  return (<ul className="menu-language-list">
    <li>
      <span role="button" key="liChangeLanguageENG" onClick={loggedLangChange('en')} tabIndex={0} >
        English
      </span>
    </li>
    <li>
      <span role="button" key="liChangeLanguageFRA" onClick={loggedLangChange('fr')} tabIndex={0} >
        Français
      </span>
    </li>
    <li>
      <span role="button" key="liChangeLanguageESP" onClick={loggedLangChange('es')} tabIndex={0} >
        Español
      </span>
    </li>
    <li>
      <span role="button" key="liChangeLanguagePOR" onClick={loggedLangChange('pt')} tabIndex={0} >
        Português
      </span>
    </li>
  </ul>);
}

export default function HeaderGrid() {

  // set up hooks
  const { language } = useI18next();


  return (
    <header>
      <div className="container">
        <h1 >
          <a href={`${process.env.GATSBY_BASE_URL}page`} className="big-name" >
            <strong>A</strong>ndre D. L. <strong>Z</strong>anchetta
          </a>
          <a href={`${process.env.GATSBY_BASE_URL}page`} className="small-name" >
            A. D. L. Zanchetta
          </a>
        </h1>
        <nav>
          <div className="menu-pages" >
            <span>Menu</span>
            <PagesListing />
          </div>
          <div className="menu-language" >
            {language.toUpperCase()}
            <LanguageListing />
          </div>
        </nav>
      </div>
    </header>
  );
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
