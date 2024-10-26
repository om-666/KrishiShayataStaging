import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [isEnglishDisplayed, setIsEnglishDisplayed] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const translate = () => {
    setIsEnglishDisplayed((prev) => !prev);
  };

  const getButtonText = () => {
    return isEnglishDisplayed ? 'ଓଡ଼ିଆ' : 'English';
  };

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
        {/* Display English Section */}
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

                <div className="infobox">
                  <p><span className="fas fa-map-marker-alt"></span> ITER Bhubaneswar</p>
                  <a href="mailto:loremlipsum@gmail.com"><span className="fas fa-envelope"></span> loremlipsum@gmail.com</a>
                  <a href="tel:+916370081836"><span className="fas fa-phone"></span> +91 6370081836</a>
                </div>

                <div className="contact map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.216091612362!2d85.80023069999999!3d20.2498709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7a3b9692fff%3A0x87cd0a356bbc39ce!2sITER%2C%20Siksha%20'Anusandhan!5e0!3m2!1sen!2sin!4v1669797534544!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Display Odia Section */}
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
                            placeholder="ଆପଣଙ୍କ ସନ୍ଦେଶ ଲେଖନ୍ତୁ"
                            aria-label="ସନ୍ଦେଶ"
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

                <div className="infobox">
                  <p><span className="fas fa-map-marker-alt"></span> ITER Bhubaneswar</p>
                  <a href="mailto:loremlipsum@gmail.com"><span className="fas fa-envelope"></span> loremlipsum@gmail.com</a>
                  <a href="tel:+916370081836"><span className="fas fa-phone"></span> +91 6370081836</a>
                </div>

                <div className="contact map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.216091612362!2d85.80023069999999!3d20.2498709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7a3b9692fff%3A0x87cd0a356bbc39ce!2sITER%2C%20Siksha%20'Anusandhan!5e0!3m2!1sen!2sin!4v1669797534544!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                  ></iframe>
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
