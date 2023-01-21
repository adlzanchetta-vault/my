import React from "react"
import { graphql } from "gatsby"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import "../../styles/header_grid.css";
import {stringToList} from "../../libs/general.js"

// // CONS ////////////////////////////////////////////////////////////////////////////////////// //

const getLanguageDicts = (acronyms, labels) => {
  let i = 0;
  const ret_list = [];
  while (i < labels.length) {
    ret_list.push({"acronym": acronyms[i], "label": labels[i]});
    i++;
  }
  return (ret_list);
}

const LANGUAGES = getLanguageDicts(
  stringToList(process.env.LANGUAGES_ACRONYMS),
  stringToList(process.env.LANGUAGES_LABELS));

// // Sub-Components //////////////////////////////////////////////////////////////////////////// //

const PageListItem = ({className, page_id, in_page}) => {
  const { t } = useTranslation();
  const pageClass = ((page_id && (page_id === in_page)) ? (` selected`) : (``));
  return (
    <li className={`${className}${pageClass}`}>
      <a href={`${process.env.GATSBY_BASE_URL}${page_id}`}>{t(page_id)}</a>
    </li>
  )
}

function PagesListing ({page_id}) {

  return (
  <ul className="menu-pages-list">
    <PageListItem className="mid" page_id={"portfolio"} in_page={page_id} />
    <PageListItem className="mid" page_id={"cv"} in_page={page_id} />
    <PageListItem className="last" page_id={"contact"} in_page={page_id} />
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

  const languageItem = (label, acronym, itemClass, i) => {
    return (
      <li className={`dropdown-item dropdown-item-${itemClass}`} key={i} >
        <span role="button" tabIndex={0}
              onClick={loggedLangChange(acronym)}
              onKeyDown={loggedLangChange(acronym)} >
          {mayHighlight(label, acronym)}
        </span>
      </li>
    );
  }

  const languageItemWrapped = (l, i) => {
    const itClass = (i < (LANGUAGES.length - 1)) ? "mid" : "last";
    return (languageItem(l.label, l.acronym, itClass, i));
  }

  return (
    <ul className="menu-language-list">
      {LANGUAGES.map(languageItemWrapped)}
    </ul>
  );
}


// // COMPONENTS //////////////////////////////////////////////////////////////////////////////// //

export default function HeaderGrid({ page_id }) {

  // set up hooks
  const { language } = useI18next();

  return (
    <header>
      <div className="container">
        <h1 >
          <a href={`${process.env.GATSBY_BASE_URL}page`} className="big-name" >
            {process.env.TITLE_NAME_LONG}
          </a>
          <a href={`${process.env.GATSBY_BASE_URL}page`} className="small-name" >
            {process.env.TITLE_NAME_SHORT}
          </a>
        </h1>
        <nav>
          <div className="menu-pages" >
            <span>Menu</span>
            <PagesListing page_id={page_id} />
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
