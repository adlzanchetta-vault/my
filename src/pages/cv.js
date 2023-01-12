import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";

import "../styles/cv.css";


const CVsection = (props) => {
  const { t, i18n } = useTranslation();

  const sectionPrefix = `cv_${props.sectionPrefix}`;

  console.log("Looking for:", sectionPrefix);

  if (!i18n.exists(`${sectionPrefix}_title`)) { return (<></>) }

  const retItems = [];
  retItems.push(<h2>{t(`${sectionPrefix}_title`)}</h2>);

  let curEntry = 1;
  while (i18n.exists(`${sectionPrefix}_${curEntry}_title`)) {
    const curPrefix = `${sectionPrefix}_${curEntry}`;

    if (i18n.exists(`${curPrefix}_title`)) {
      retItems.push(<h3>{t(`${curPrefix}_title`)}</h3>)
    }
    
    // 
    if (i18n.exists(`${curPrefix}_date`)) {
      retItems.push(<p><em>{t(`${curPrefix}_date`)}</em></p>);
    }

    // 
    if (i18n.exists(`${curPrefix}_institution`)) {
      retItems.push(<p>{t(`${curPrefix}_institution`)}</p>);
    }

    // 
    if (i18n.exists(`${curPrefix}_location`)) {
      retItems.push(<p className="last" >{t(`${curPrefix}_location`)}</p>);
    }

    curEntry += 1;
  }

  // publication case
  curEntry = 1;
  while (i18n.exists(`${sectionPrefix}_${curEntry}_citation`)) {
    const curPrefix = `${sectionPrefix}_${curEntry}`;

    const curDoi = i18n.exists(`${curPrefix}_doi`) ?
                   t(`${curPrefix}_doi`) :
                   null;

    const curDoiTag = curDoi ?
      <>
        <span> DOI:</span>
        <a href={`https://doi.org/${curDoi}`} target="_blank" rel="noreferrer">{curDoi}</a>
      </>:
      <></>
  
    //
    retItems.push(

      <p className="last">
        {t(`${curPrefix}_citation`)}
        {curDoiTag}
      </p>);

    curEntry += 1;
  }


  return (retItems);
}


export default function Cv() {

  const { t } = useTranslation();  // used for showing
 
  return ( 
    <Layout title={t("cv")} >
      <CVsection sectionPrefix="experience" />
      <CVsection sectionPrefix="education" />
      <CVsection sectionPrefix="publication" />
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
