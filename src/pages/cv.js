import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "./common/Layout";

import "../styles/cv.css";

const PAGE_ID = "cv";

const CVsectionGeneric = (props) => {
  const { t, i18n } = useTranslation();

  const sectionPrefix = `cv_${props.sectionPrefix}`;

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

  return (retItems);
}


const CVItemPublicationRef = ({reference}) => {

  // finds sentences between '<' and '>'
  const splittedRef = reference.split(/(?:<|>)/);

  return ((splittedRef.length !== 3) ?
          (<>{reference}.</>) :
          (<>
             {splittedRef[0]}
             <strong>{splittedRef[1]}</strong>
             {splittedRef[2]}.
           </>));
}


const CVItemPublicationDOI = ({doi}) => {
  if (!doi) { return (null); }

  return (
    <>
      <span> DOI: </span>
      <a href={`https://doi.org/${doi}`} target="_blank" rel="noreferrer">{doi}</a>.
    </>
  );
}

const CVitemPublication = (publication, idx) => {
  if (!(publication && publication.reference)) {
    return (null)
  }

  return (
    <p className="last" key={idx} >
      <CVItemPublicationRef reference={publication.reference} />
      <CVItemPublicationDOI doi={publication.doi} />
    </p>
  )
}

const CVsectionPublications = ({publications}) => {
  const { t, i18n } = useTranslation();  // used for showing
  
  const sectionName = `cv_publication_title`;

  // basic check
  if (!(publications && publications.length && i18n.exists(sectionName))) {
    return (null);
  }

  return <>
    { <h2>{t(sectionName)}</h2> }
    { publications.map(CVitemPublication) }
  </>
}


export default function Cv({data}) {

  const { t } = useTranslation();  // used for showing
 
  return ( 
    <Layout title={t(PAGE_ID)} page_id={PAGE_ID}>
      <CVsectionGeneric sectionPrefix="experience" />
      <CVsectionGeneric sectionPrefix="education" />
      <CVsectionPublications publications={data.publication.nodes} />
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
    },
    publication: allCvPublicationsJson {
        nodes {
          reference
          doi
        }
    }
  }
`;
