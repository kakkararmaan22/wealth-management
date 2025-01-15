import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './Notified.module.css'; // Assuming you're using CSS Modules

const Notified = ({ totalEarnings, totalExpenses }) => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    return storedPhoneNumber || '+91';
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    return storedPhoneNumber || '+91';
  });
  const [notificationSent, setNotificationSent] = useState(false);
  const [threshold, setThreshold] = useState(() => {
    const storedThreshold = localStorage.getItem('threshold');
    return storedThreshold ? parseInt(storedThreshold, 10) : 80;
  });

  const handleInputChange = (e) => {
    setInputPhoneNumber(e.target.value);
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    if (inputPhoneNumber !== phoneNumber) {
      setPhoneNumber(inputPhoneNumber);
      setNotificationSent(false); // Reset notification status
      localStorage.setItem('phoneNumber', inputPhoneNumber);
    }
  };

  const handleThresholdChange = (e) => {
    setThreshold(e.target.value);
    localStorage.setItem('threshold', e.target.value);
  };

  const sendNotification = useCallback(() => {
    console.log('Sending notification...');
    axios.post('http://localhost:3001/send-notification', {
      to: phoneNumber,
      body: `Total expense has reached ${threshold}% of your earnings!`,
    })
      .then((response) => {
        console.log(response);
        setNotificationSent(true);
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
        alert('Failed to send notification. Please check the server.');
      });
  }, [phoneNumber, threshold]);

  useEffect(() => {
    if (totalEarnings > 0) {
      const percentage = (totalExpenses / totalEarnings) * 100;
      if (percentage >= threshold && phoneNumber.length > 10) {
        if (!notificationSent) {
          console.log('Sending notification...');
          sendNotification();
        }
      }
    }
  }, [totalEarnings, totalExpenses, phoneNumber, threshold, sendNotification, notificationSent]);

  return (
    <div className={styles.notifiedContainer}>
      <h1>Expense Tracker</h1>
      <div>
        <h2>Earnings: ₹{totalEarnings}</h2>
      </div>
      <div>
        <h2>Expenses: ₹{totalExpenses}</h2>
      </div>
      <form onSubmit={handlePhoneNumberSubmit} className={styles.phoneInputContainer}>
        <label>
          Phone Number:
          <input
            type="text"
            value={inputPhoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className={styles.phoneSubmitBtn}>Set Phone Number</button>
      </form>
      <div className={styles.thresholdContainer}>
        <label>
          Notification Threshold (%):
          <input
            type="range"
            min="0"
            max="100"
            value={threshold}
            onChange={handleThresholdChange}
            className={styles.thresholdSlider}
          />
          <span>{threshold}%</span>
        </label>
      </div>
      {notificationSent && (
        <div className={styles.notificationSent}>
          <p>Notification sent!</p>
        </div>
      )}
    </div>
  );
};

export default Notified;