import { useState } from 'react';
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      alert('Message sent! (Demo only)');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section className="contact">
      <h2 className="contact-heading">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="form-input form-textarea"
          />
          {errors.message && <span className="form-error">{errors.message}</span>}
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
      <div className="socials">
        <a href="#" className="social-link">GitHub</a>
        <a href="#" className="social-link">Twitter</a>
        <a href="#" className="social-link">LinkedIn</a>
      </div>
    </section>
  );
};

export default Contact;
