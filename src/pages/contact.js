import React, { useState } from 'react';
import axios from 'axios';
import '../contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send form data to the server or API endpoint using axios or fetch
    try {
      // I will replace 'YOUR_API_URL' with the actual URL where i want to send the data
      const response = await axios.post('YOUR_API_URL', formData);
      console.log(response.data); // Handle the response from the server as needed
    } catch (error) {
      console.error('Error sending data: ', error);
    }
    
    // Clear the form fields
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          className="contact-input"
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          value={formData.name} // Bind the value of the input to the form data
          required
        />
        <input
          className="contact-input"
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          value={formData.email} // Bind the value of the input to the form data
          required
        />
        <textarea
          className="contact-textarea"
          name="message"
          placeholder="Your Message"
          onChange={handleChange}
          value={formData.message} // Bind the value of the textarea to the form data
          required
        />
        <button className="contact-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
