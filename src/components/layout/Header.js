import React from "react"
// import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";

import "../../styles/header.css";
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

const PageListItem = ({className, page_id, in_page, t}) => {
  const pageClass = ((page_id && (page_id === in_page)) ? (` selected`) : (``));
  return (
    <li className={`${className}${pageClass}`}>
      <a href={`${process.env.GATSBY_BASE_URL}${page_id}`}>{t(page_id)}</a>
    </li>
  )
}

function PagesListing ({page_id, t}) {

  return (
  <ul className="menu-pages-list">
    <PageListItem className="mid" page_id={"portfolio"} in_page={page_id} t={t} />
    <PageListItem className="mid" page_id={"cv"} in_page={page_id} t={t} />
    <PageListItem className="last" page_id={"contact"} in_page={page_id} t={t} />
  </ul>);
}

function LanguageListing ({ language, changeLanguage }) {
  // const { language, changeLanguage } = useI18next();

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

export default function Header({ page_id, t, language, changeLanguage }) {

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
            <PagesListing page_id={page_id} t={t} />
          </div>
          <div className="menu-language" >
            {`[${language.toUpperCase()}]`}
            <LanguageListing language={language} changeLanguage={changeLanguage} />
          </div>
        </nav>
      </div>
    </header>
  );
}