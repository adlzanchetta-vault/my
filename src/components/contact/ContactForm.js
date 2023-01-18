import React from "react";
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { useTranslation } from "gatsby-plugin-react-i18next";


// // SUB OBJECT //////////////////////////////////////////////////////////////////////////////////

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


const ContactFormSubmitButton = ({ label }) => {

  return (
    <Form.Item wrapperCol={{ span: 24 }} >
      <Button type="primary" htmlType="submit">{label}</Button>
    </Form.Item>
  );

};


// // MAIN OBJECT /////////////////////////////////////////////////////////////////////////////////

export default function ContactForm ({label, formInfo}) {

    // wen hooks
    const { t } = useTranslation();  // used for showing
    const [form] = Form.useForm();

    if (!(formInfo.contactForm_method && formInfo.contactForm_action)) { return (null); }

    // submit function
    const onFormFinish = (values) => {
      axios.post(formInfo.contactForm_action, values).then((response) => {
        console.log("Sent:", response);
      }).catch((error) => {
        console.warn("Failed:", error);
      })
    };

    // build component
    return (
      <div className="email_webform" >
        {/* <div>{label}</div> */}
        <div>
          <Form
            form={form}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            method={formInfo.contactForm_method}
            action={formInfo.contactForm_action}
            onFinish={onFormFinish}>
            
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
            <ContactFormSubmitButton label={t("contact_form_send")} />
          </Form>
        </div>
      </div>
    );
  }



