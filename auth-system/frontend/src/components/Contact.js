import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [isEnglishDisplayed, setIsEnglishDisplayed] = useState(true);
  const [lang, setLang] = useState("en"); // Default to English
  const [mode, setMode] = useState("phonetic"); // Default to Phonetic
  const { register, handleSubmit, reset, setValue } = useForm();

  // Swalekh Credentials
  const swalekhCredentials = {
    apiKey: "rev.transliteration", 
    appId: "172c5bb5af18516905473091fd58d30afe740b3f", 
    apiEndPoint: "https://swalekht13n.reverieinc.com/transliteration"
  };

  // Language toggle function
  const translate = () => {
    setIsEnglishDisplayed((prev) => !prev);
    setLang(isEnglishDisplayed ? "or" : "en"); // Switch between English and Odia
    setMode((prevMode) => (prevMode === "phonetic" ?  "phonetic":  "keyboard")); // Toggle mode
  };

  // Get button text depending on language
  const getButtonText = () => {
    return isEnglishDisplayed ? 'ଓଡ଼ିଆ' : 'English';
  };

  // Initialize Swalekh on specific elements like textareas
  const initSwalekh = () => {
    const element = document.querySelector(".swalekh-t13n");
    if (!element) {
      console.error("Swalekh text area element not found!");
      return;
    }

    // Logging the mode and language for debugging
    console.log("Initializing Swalekh with mode:", mode, "and language:", lang);

    window.loadSwalekh({
      apiKey: swalekhCredentials.apiKey,
      appId: swalekhCredentials.appId,
      querySel: ".swalekh-t13n",  // Target specific element by class
      lang: lang, // Set language dynamically
      domain: 1, // Domain code (1 for Indic, 0 for non-Indic)
      mode: mode === 'phonetic' ? 'phonetic' : 'keyboard', // Set the mode dynamically
    });
  };

  // Cleanup when changing language or mode
  useEffect(() => {
    initSwalekh();
    return () => {
      // Unload Swalekh to avoid memory leaks
      window.unloadSwalekh({ querySel: ".swalekh-t13n" });
    };
  }, [lang, mode]); // Reinitialize on language or mode change

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

  return (
    <div className="container">
      <button onClick={translate} className="translate-button">
        {getButtonText()}
      </button>
      <div className="content">
        {/* English Section */}
        {isEnglishDisplayed && (
          <section className="body">
            <div className="contactus">
              <div className="title">
                <h2>Contact us!</h2>
              </div>
              <div className="box">
                <div className="contact form">
                  <h3>Send a message</h3>
                  <form onSubmit={handleSubmit(sendEmail)}>
                    <div className="formbox">
                      <div className="row50">
                        <div className="inputbox">
                          <span>First name</span>
                          <input
                            {...register('firstname')}
                            type="text"
                            placeholder="Enter Your first name"
                            aria-label="First Name"
                            required
                          />
                        </div>
                        <div className="inputbox">
                          <span>Last name</span>
                          <input
                            {...register('lastname')}
                            type="text"
                            placeholder="Enter your last name"
                            aria-label="Last Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="row50">
                        <div className="inputbox">
                          <span>Email</span>
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="Enter Your mail"
                            aria-label="Email"
                            required
                          />
                        </div>
                        <div className="inputbox">
                          <span>Mobile</span>
                          <input
                            {...register('mobile')}
                            type="number"
                            placeholder="Enter Your number"
                            aria-label="Mobile Number"
                            required
                          />
                        </div>
                      </div>
                      <div className="row100">
                        <div className="inputbox">
                          <span>Query or Message</span>
                          <textarea
                            {...register('message')}
                            placeholder="Write Your Message"
                            aria-label="Message"
                            className="swalekh-t13n"  // Add the class for Swalekh to identify
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="row100">
                        <div className="inputbox">
                          <input type="submit" value="Send" className="submit-button" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Odia Section */}
        {!isEnglishDisplayed && (
          <section className="body">
            <div className="contactus">
              <div className="title">
                <h2>ସମ୍ପର୍କ କରନ୍ତୁ!</h2>
              </div>
              <div className="box">
                <div className="contact form">
                  <h3>ଏହି ସନ୍ଦେଶ ପଠାନ୍ତୁ</h3>
                  <form onSubmit={handleSubmit(sendEmail)}>
                    <div className="formbox">
                      <div className="row50">
                        <div className="inputbox">
                          <span>ପ୍ରଥମ ନାମ</span>
                          <input
                            {...register('firstname')}
                            type="text"
                            placeholder="ଆପଣଙ୍କ ପ୍ରଥମ ନାମ ଦିଅନ୍ତୁ"
                            aria-label="ପ୍ରଥମ ନାମ"
                            required
                          />
                        </div>
                        <div className="inputbox">
                          <span>ଶେଷ ନାମ</span>
                          <input
                            {...register('lastname')}
                            type="text"
                            placeholder="ଆପଣଙ୍କ ଶେଷ ନାମ ଲେଖନ୍ତୁ"
                            aria-label="ଶେଷ ନାମ"
                            required
                          />
                        </div>
                      </div>
                      <div className="row50">
                        <div className="inputbox">
                          <span>ଇମେଲ</span>
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="ଆପଣଙ୍କ ଇମେଲ ଦିଅନ୍ତୁ"
                            aria-label="ଇମେଲ"
                            required
                          />
                        </div>
                        <div className="inputbox">
                          <span>ମୋବାଇଲ</span>
                          <input
                            {...register('mobile')}
                            type="number"
                            placeholder="ଆପଣଙ୍କ ନମ୍ବର ଦିଅନ୍ତୁ"
                            aria-label="ମୋବାଇଲ"
                            required
                          />
                        </div>
                      </div>
                      <div className="row100">
                        <div className="inputbox">
                          <span>ପ୍ରଶ୍ନ କିମ୍ବା ସନ୍ଦେଶ</span>
                          <textarea
                            {...register('message')}
                            placeholder="ଆପଣଙ୍କର ସନ୍ଦେଶ ଲେଖନ୍ତୁ"
                            aria-label="ସନ୍ଦେଶ"
                            className="swalekh-t13n"  // Add class for Swalekh
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="row100">
                        <div className="inputbox">
                          <input type="submit" value="ପଠାନ୍ତୁ" className="submit-button" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Contact;
