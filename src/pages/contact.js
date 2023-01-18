import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import ContactForm from "./contact/ContactForm";
import SocialMediaProfiles from "./contact/SocialMediaProfiles";

import Layout from "./common/Layout";

import "../styles/contact.css";

// https://www.adhamdannaway.com/contact
// https://ant.design/components/form

// https://www.gatsbyjs.com/docs/building-a-contact-form/



export default function Contact({data}) {
 
  const { t } = useTranslation();  // used for showing

  return ( 
    <Layout title={t("contact")}>
      <ContactForm label={t("contact_form_call")} formInfo={data.contact_form} />
      <SocialMediaProfiles label={t("contact_profiles_call")} profiles={data.social_media.nodes} />
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
