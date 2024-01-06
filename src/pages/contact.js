import React, { useState } from 'react';
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
    console.log(formData);
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
          required 
        />
        <input 
          className="contact-input" 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          onChange={handleChange} 
          required 
        />
        <textarea 
          className="contact-textarea" 
          name="message" 
          placeholder="Your Message" 
          onChange={handleChange} 
          required 
        />
        <button className="contact-button" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
