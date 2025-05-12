import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { Tractor, MapPin, Phone, Mail, User, MessageCircle } from 'lucide-react';

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Text items to translate
  const textItems = [
    "Farmer Support Center",
    "Get Agricultural Assistance",
    "First Name",
    "Last Name",
    "Email Address",
    "Phone Number",
    "Your Query or Concern",
    "Submit Request",
    "We're Here to Help",
    "Select Inquiry Type"
  ];

  // Inquiry types specific to farming
  const inquiryTypes = [
    "Crop Advice",
    "Livestock Support",
    "Equipment Consultation",
    "Market Information",
    "Funding & Grants",
    "Other Agricultural Queries"
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
  }, [selectedLanguage]);

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
        inquiryType: data.inquiryType,
        message: data.message,
      });
      alert('Your request has been sent successfully. We will get back to you soon!');
      reset();
    } catch (error) {
      alert('Failed to send request. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin">
          <Tractor size={48} className="text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Decorative Agricultural Image */}
          <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{
            backgroundImage: 'url("/api/placeholder/600/800")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div className="bg-green-700 bg-opacity-60 h-full flex items-center justify-center">
              <div className="text-center text-white p-8">
                <Tractor size={64} className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{getTranslatedText("We're Here to Help")}</h2>
                <p className="text-lg">
                  Connecting farmers with expert support, resources, and solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
              <Tractor className="mr-3 text-green-600" />
              {getTranslatedText("Farmer Support Center")}
            </h2>
            <form onSubmit={handleSubmit(sendEmail)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <User size={16} className="mr-2 text-green-600" />
                    {getTranslatedText("First Name")}
                  </label>
                  <input
                    {...register('firstname', { required: "First name is required" })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder={getTranslatedText("First Name")}
                  />
                  {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <User size={16} className="mr-2 text-green-600" />
                    {getTranslatedText("Last Name")}
                  </label>
                  <input
                    {...register('lastname', { required: "Last name is required" })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder={getTranslatedText("Last Name")}
                  />
                  {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail size={16} className="mr-2 text-green-600" />
                    {getTranslatedText("Email Address")}
                  </label>
                  <input
                    {...register('email', { 
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder={getTranslatedText("Email Address")}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Phone size={16} className="mr-2 text-green-600" />
                    {getTranslatedText("Phone Number")}
                  </label>
                  <input
                    {...register('mobile', { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number (10 digits)"
                      }
                    })}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder={getTranslatedText("Phone Number")}
                  />
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageCircle size={16} className="mr-2 text-green-600" />
                  {getTranslatedText("Select Inquiry Type")}
                </label>
                <select
                  {...register('inquiryType', { required: "Please select an inquiry type" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">Select Inquiry Type</option>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageCircle size={16} className="mr-2 text-green-600" />
                  {getTranslatedText("Your Query or Concern")}
                </label>
                <textarea
                  {...register('message', { 
                    required: "Please provide your message",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  })}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder={getTranslatedText("Describe your agricultural query or concern")}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
                >
                  <Tractor size={20} className="mr-2" />
                  {getTranslatedText("Submit Request")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;