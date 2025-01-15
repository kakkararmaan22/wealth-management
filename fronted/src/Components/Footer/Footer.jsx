import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2024 my-money. All rights reserved.</p>
        <p>Contact us: support@my-money.com | +91-9876543210</p>
        <p>Follow us on social media for updates and more!</p>
      </div>
    </footer>
  );
};

export default Footer;
