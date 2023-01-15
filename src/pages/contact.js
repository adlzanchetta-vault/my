import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import ContactForm from "./contact/ContactForm"

import Layout from "../components/Layout";

import "../styles/contact.css";

// https://www.adhamdannaway.com/contact
// https://ant.design/components/form

// https://www.gatsbyjs.com/docs/building-a-contact-form/


const SocialMediaProvideLink = ({profile}) => {
  let retObj = null;
  if (profile.profile_url) {
    retObj = (
      <a href={`${profile.profile_url}` }
         style={ {color: profile.name_color} }
         target="_blank" rel="noreferrer" >
        <img src={`${process.env.GATSBY_BASE_URL}${profile.logo_img}`}
           alt={profile.name} className="social_media_icon" />
        <span>{profile.name}</span>
      </a>
    );
  } else {
    retObj = (
      <>
        <img src={`${process.env.GATSBY_BASE_URL}${profile.logo_img}`}
          alt={profile.name} className="social_media_icon" />
        <span style={{color: profile.name_color}}>
          {profile.name}
        </span>
      </>
    );
  }

  return (retObj);
}


const SocialMediaProfile = (profile) => {
  return (
    <div className="social_media_profile">
      <SocialMediaProvideLink profile={profile} />
    </div>
  );
}


const SocialMediaProfiles = ({profiles}) => {
  return (
    <div className="social_media_profiles" >
      { profiles.map(SocialMediaProfile) }
    </div>
  );
};


export default function Contact({data}) {
 
  const { t } = useTranslation();  // used for showing

  return ( 
    <Layout title={t("contact")}>
      <p>
        {t("contact_contactme")}
      </p>
      <ContactForm formInfo={data.contact_form} />
      <SocialMediaProfiles profiles={data.social_media.nodes} />
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
    social_media: allContactSocialMediaJson {
        nodes {
          logo_img
          name
          name_color
          profile_url
        }
    },
    contact_form: globalesJson {
      contactForm_method
      contactForm_action
      contactForm_sender_name_field
      contactForm_sender_email_field
      contactForm_sender_phone_field
      contactForm_sender_message
    }
  }
`;
