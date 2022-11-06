import React, { useState } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next";

import { base_url } from "../env/globals";
import "../styles/header_grid.css";

export default function HeaderGrid() {

  // set up hooks
  const [menuActive, setMenuActive] = useState(false);
  const { t } = useTranslation();

  const menuListIconClick = () => {
    
  }

  return (
    <header>
      <div className="container">
        <h1 >
          <a href={`${base_url}`}>
            <strong>A</strong>ndre D. L. <strong>Z</strong>anchetta
          </a>
        </h1>
        <nav>
          <div className={`menu ${menuActive ? 'active': ''} `}>
            <ul>
              <li>
                <a href={`${base_url}portfolio`}>{t("portfolio")}</a>
              </li>
              <li>
                <a href={`${base_url}cv`}>{t("cv")}</a>
              </li>
              <li>
                <a href={`${base_url}contact`}>{t("contact")}</a>
              </li>
            </ul>
          </div>
          <div className="menu-list-icon" onClick={ menuListIconClick } >
            Menu
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
