import React from 'react';
import { Linkedin, Github, Send } from 'lucide-react';
import './Footer.css';

// Twitter/X SVG Icon Component
const XIcon = ({ size = 18 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const creationYear = 2025;

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/olskido',
      icon: <Linkedin size={20} />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/olskido',
      icon: <Github size={20} />
    },
    {
      name: 'X',
      url: 'https://x.com/olskiddo',
      icon: <XIcon />
    },
    {
      name: 'Telegram',
      url: 'https://t.me/olskido',
      icon: <Send size={20} />
    }
  ];

  return (
    <footer className="footer-section" id="contact">
      <div className="footer-container">
        {/* Contact Form Section */}
        <div className="footer-contact-wrapper">
          <h2 className="contact-heading">Get in touch</h2>
          <form className="contact-form" action="mailto:Olskidox@gmail.com" method="post" encType="text/plain">
            <div className="form-group">
              <input type="text" name="name" placeholder="Name" className="form-input" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email" className="form-input" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Message" className="form-input form-textarea" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
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
                {/* Clone element with size 18 prop */}
                {React.cloneElement(link.icon, { size: 18 })}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content" style={{ justifyContent: 'center' }}>
          <p className="footer-copyright">
            © {creationYear}{currentYear !== creationYear ? `-${currentYear}` : ''} OLSKIDO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;