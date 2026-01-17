import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Linkedin, Github, Send, Loader2, CheckCircle } from 'lucide-react';
import './Footer.css';

// Twitter/X SVG Icon Component
const XIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const currentYear = new Date().getFullYear();
  const creationYear = 2025;

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // These IDs must match your EmailJS Dashboard exactly
    emailjs.sendForm(
      'service_qttl2ld',
      'template_2p0ooog',
      form.current,
      'Gs90UeggxJRlaLJfg'
    )
      .then(() => {
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error('Email Error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/olskido', icon: <Linkedin /> },
    { name: 'GitHub', url: 'https://github.com/olskido', icon: <Github /> },
    { name: 'X', url: 'https://x.com/olskiddo', icon: <XIcon /> },
    { name: 'Telegram', url: 'https://t.me/olskido', icon: <Send /> }
  ];

  return (
    <footer className="footer-section" id="contact">
      <div className="footer-container">
        <div className="footer-contact-wrapper">
          <h2 className="contact-heading">Get in touch</h2>

          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              {/* Note: name="user_name" matches {{user_name}} in your template */}
              <input
                type="text"
                name="user_name"
                placeholder="Name"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              {/* Note: name="user_email" matches {{user_email}} in your template */}
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Message"
                className="form-input form-textarea"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`submit-btn ${status === 'success' ? 'btn-success' : ''}`}
              disabled={status === 'sending' || status === 'success'}
            >
              {status === 'sending' && <Loader2 className="animate-spin" size={18} style={{ marginRight: '8px' }} />}
              {status === 'success' && <CheckCircle size={18} style={{ marginRight: '8px' }} />}
              {status === 'idle' && 'Send Message'}
              {status === 'error' && 'Try Again'}
              {status === 'success' && 'Sent!'}
            </button>
          </form>
        </div>

        <div className="footer-right">
          <div className="social-links-container">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={link.name}
              >
                {React.cloneElement(link.icon, { className: 'footer-social-icon' })}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <p className="footer-copyright">
            © {creationYear}{currentYear > creationYear ? ` - ${currentYear}` : ''} OLSKIDO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;