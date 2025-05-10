import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import axios from 'axios';
import './Contact.css';
import Footer from './Footer';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Text items to translate
  const textItems = [
    "Contact us!",
    "Send a message",
    "First name",
    "Last name",
    "Email",
    "Mobile",
    "Query or Message",
    "Send"
  ];

  // Fetch translations on mount and when language changes
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const translationPromises = textItems.map(async (text) => {
            const response = await axios.post(`${process.env.REACT_APP_AVK_ENDPOINT}/api/translate`, {
            en: text,
            langCode: selectedLanguage,
            });
          return { [text]: response.data.translation };
        });

        const results = await Promise.all(translationPromises);
        const translationMap = Object.assign({}, ...results);
        setTranslations(translationMap);
      } catch (error) {
        console.error("Error fetching translations:", error);
        // Fallback to English if API fails
        const fallbackTranslations = {};
        textItems.forEach((text) => {
          fallbackTranslations[text] = text;
        });
        setTranslations(fallbackTranslations);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [selectedLanguage]); // Refetch when selectedLanguage changes

  // Function to get translated text
  const getTranslatedText = (englishText) => {
    return translations[englishText] || englishText;
  };

  // Email submission handler
  const sendEmail = async (data) => {
    emailjs.init('tAmGf6bzxl7EmrbL4');
    try {
      await emailjs.send('service_rhxx84h', 'template_x558arl', {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        mobile: data.mobile,
        message: data.message,
      });
      alert('Email sent successfully');
      reset();
    } catch (error) {
      alert('Failed to send email');
    }
  };

  if (loading) {
    return <div>Loading contact form...</div>;
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <section className="body">
            <div className="contactus">
              <div className="title">
                <h2>{getTranslatedText("Contact us!")}</h2>
              </div>
              <div className="box">
                <div className="contact form">
                  <h3>{getTranslatedText("Send a message")}</h3>
                  <form onSubmit={handleSubmit(sendEmail)}>
                    <div className="formbox">
                      <div className="row50">
                        <div className="inputbox">
                          <span>{getTranslatedText("First name")}</span>
                          <input
                            {...register('firstname')}
                            type="text"
                            placeholder={getTranslatedText("First name")}
                            aria-label={getTranslatedText("First name")}
                            required
                          />
                        </div>
                        <div className="inputbox">
                          <span>{getTranslatedText("Last name")}</span>
                          <input
                            {...register('lastname')}
                            type="text"
                            placeholder={getTranslatedText("Last name")}
                            aria-label={getTranslatedText("Last name")}
                            required
                          />
                        </div>
                      </div>
                      <div className="row50">
                        <div className="inputbox">
                          <span>{getTranslatedText("Email")}</span>
                          <input
                            {...register('email')}
                            type="email"
                            placeholder={getTranslatedText("Email")}
                            aria-label={getTranslatedText("Email")}
                            required
                          />
                        </div>
                        <div className="inputbox">
                          <span>{getTranslatedText("Mobile")}</span>
                          <input
                            {...register('mobile')}
                            type="number"
                            placeholder={getTranslatedText("Mobile")}
                            aria-label={getTranslatedText("Mobile")}
                            required
                          />
                        </div>
                      </div>
                      <div className="row100">
                        <div className="inputbox">
                          <span>{getTranslatedText("Query or Message")}</span>
                          <textarea
                            {...register('message')}
                            placeholder={getTranslatedText("Query or Message")}
                            aria-label={getTranslatedText("Query or Message")}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="row100">
                        <div className="inputbox">
                          <input
                            type="submit"
                            value={getTranslatedText("Send")}
                            className="submit-button"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;