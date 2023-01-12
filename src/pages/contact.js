import React from "react";
import { graphql } from "gatsby";
import { Button, Form, Input } from 'antd';
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";

import "../styles/contact.css";

// https://www.adhamdannaway.com/contact
// https://ant.design/components/form

const MessageForm = () => {

  const { t } = useTranslation();  // used for showing

  const { TextArea } = Input;

  return (
    <div className="email_webform" >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
      >
        <Form.Item
          label={t("contact_form_name")}
          name="contact_name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("contact_form_email")}
          name="contact_email"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("contact_form_phone")}
          name="contact_phone"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("contact_form_message")}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button>{t("contact_form_send")}</Button>
        </Form.Item>
      </Form>
    </div>
  );
}


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
      <MessageForm />
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
    }
  }
`;
