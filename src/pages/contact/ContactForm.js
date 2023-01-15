import React from "react";
import { Button, Form, Input } from 'antd';
import { useTranslation } from "gatsby-plugin-react-i18next";


const ContactFormInput = ({label, form_info_name_id, required}) => {
    
    // does not show if form info id is 'false'
    if (!(form_info_name_id)) {
        return (null);
    }
    
    // build object and return
    return (
        <Form.Item
         label={label}
         name={form_info_name_id}
         rules={[{ required: required }]} >
            <Input />
        </Form.Item>
    )
}


const ContactFormTextArea = ({label, form_info_name_id, required}) => {
   
    const { TextArea } = Input;

    // does not show if form info id is 'false'
    if (!(form_info_name_id)) {
        return (null);
    }

    // 
    // build object and return
    return (
        <Form.Item
         label={label}
         name={form_info_name_id}
         rules={[{ required: required }]} >
            <TextArea rows={4} />
        </Form.Item>
    )
}


// // MAIN OBJECT /////////////////////////////////////////////////////////////////////////////////

export default function ContactForm ({formInfo}) {

    const { t } = useTranslation();  // used for showing

    if (!(formInfo.contactForm_method && formInfo.contactForm_action)) { return (null); }
  
    return (
      <div className="email_webform" >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          method={formInfo.contactForm_method}
          action={formInfo.contactForm_action}>
          
          <ContactFormInput label={t("contact_form_name")}
                            form_info_name_id={formInfo.contactForm_sender_name_field}
                            required={true} />
          <ContactFormInput label={t("contact_form_email")}
                            form_info_name_id={formInfo.contactForm_sender_email_field}
                            required={false} />
          <ContactFormInput label={t("contact_form_phone")}
                            form_info_name_id={formInfo.contactForm_sender_phone_field}
                            required={false} />
          <ContactFormTextArea label={t("contact_form_message")}
                            form_info_name_id={formInfo.contactForm_sender_message}
                            required={true} />
  
          <Form.Item>
            <Button>{t("contact_form_send")}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }



