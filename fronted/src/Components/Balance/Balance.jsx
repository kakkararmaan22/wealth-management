import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './Balance.module.css';

const Balance = ({ totalEarnings, totalExpenses }) => {
  const data = {
    labels: ['Earnings', 'Expenses'],
    datasets: [
      {
        label: 'Amount in ₹',
        data: [totalEarnings, totalExpenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const balance = totalEarnings - totalExpenses;
  const isNegative = balance < 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Balance</h2>
      <div className={styles.chart}>
        <Bar data={data} options={{ maintainAspectRatio: false }} />
      </div>
      <div className={`${styles.balance} ${isNegative ? styles.negative : ''}`}>
        <h3>{isNegative ? 'Over Budget: ₹' : 'Balance: ₹'}{Math.abs(balance).toFixed(2)}</h3>
        {isNegative && (
          <p className={styles.warning}>Your expenses exceed your earnings. Consider reviewing your budget.</p>
        )}
      </div>
    </div>
  );
};

export default Balance;
