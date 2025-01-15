import React from 'react';
import styles from './Home.module.css';
import wealth_img from "../../asset/wealth.jpg";

const Home = () => {
  return (
    <div className={styles.container}>
      <img src={wealth_img} alt="Wealth" className={styles.image} loading="lazy" />
      <h1>Welcome to my-money!</h1>
      <p>Here you can manage your finances effectively and stay on top of your goals.</p>
      
      {/* New Section for User Tips */}
      <div className={styles.tipsSection}>
        <h2>Tips for Managing Your Wealth</h2>
        <ul>
          <li>Regularly review your expenses and earnings to stay on track.</li>
          <li>Set financial goals and track your progress towards them.</li>
          <li>Utilize budgeting tools to plan your monthly expenses.</li>
          <li>Save a portion of your earnings for unexpected costs.</li>
        </ul>
      </div>

      <div className={styles.developerSection}>
        <h2>About the Developer</h2>
        <p>Hello! I'm Armaan, the developer behind this application. I'm passionate about creating tools that help people manage their finances more effectively. If you have any questions or feedback, feel free to reach out!</p>
      </div>
    </div>
  );
};

export default Home;
