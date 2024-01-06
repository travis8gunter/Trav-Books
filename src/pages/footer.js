import React from 'react';
import '../footer.scss';
import NavContainer from '../navbar/nav-container';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Trav's Library. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
