import React from "react"
import { graphql } from "gatsby"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import "../styles/header_grid.css";

// // CONS ////////////////////////////////////////////////////////////////////////////////////// //

const LANGUAGES = [
  {"acronym": "en", "label": "English"},
  {"acronym": "fr", "label": "Français"},
  {"acronym": "es", "label": "Español"},
  {"acronym": "pt", "label": "Português"}
]

// // CONS ////////////////////////////////////////////////////////////////////////////////////// //

function PagesListing () {
  const { t } = useTranslation();

  return (
  <ul className="menu-pages-list">
    <li className="mid ">
      <a href={`${process.env.GATSBY_BASE_URL}portfolio`}>{t("portfolio")}</a>
    </li>
    <li className="mid">
      <a href={`${process.env.GATSBY_BASE_URL}cv`}>{t("cv")}</a>
    </li>
    <li className="last">
      <a href={`${process.env.GATSBY_BASE_URL}contact`}>{t("contact")}</a>
    </li>
  </ul>);
}

function LanguageListing () {
  const { language, changeLanguage } = useI18next();

  const loggedLangChange = (lang) => {
    return () => { changeLanguage(lang); }
  }

  const mayHighlight = (label, acronym) => {
    return ((acronym === language) ? (<strong>{label}</strong>) : label);
  }

  return (
    <ul className="menu-language-list">
      {LANGUAGES.map((l, i) => {
        const itClass = (i < (LANGUAGES.length - 1)) ? "mid" : "last";
        
        return (
          <li className={`dropdown-item dropdown-item-${itClass}`}>
            <span role="button"  tabIndex={0}
                  key={`liChangeLanguage${l.acronym.toUpperCase()}`}
                  onClick={loggedLangChange(l.acronym)} >
              {mayHighlight(l.label, l.acronym)}
            </span>
          </li>)
      })}
    </ul>
  );
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
            {`[${language.toUpperCase()}]`}
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
