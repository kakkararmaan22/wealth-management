import React, { useState } from 'react';
import styles from './Earn.module.css';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Earn = ({ earnings, setEarnings }) => {
  const [earnAmount, setEarnAmount] = useState('');
  const [earnCategory, setEarnCategory] = useState('Salary');
  const [editIndex, setEditIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['Salary', 'Freelance', 'Investment', 'Other'];

  const handleAmountChange = (event) => {
    setEarnAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setEarnCategory(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!earnAmount || !earnCategory) return;

    const currentDate = new Date().toLocaleDateString();
    const newEarning = { category: earnCategory, amount: parseFloat(earnAmount), date: currentDate };

    if (editIndex !== null) {
      const updatedEarnings = [...earnings];
      updatedEarnings[editIndex] = newEarning;
      setEarnings(updatedEarnings);
      setEditIndex(null);
    } else {
      setEarnings((prevEarnings) => [...prevEarnings, newEarning]);
    }

    setEarnAmount('');
    setEarnCategory('Salary');
  };

  const handleEdit = (index) => {
    const earningToEdit = earnings[index];
    setEarnAmount(earningToEdit.amount);
    setEarnCategory(earningToEdit.category);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEarnings = earnings.filter((_, i) => i !== index);
    setEarnings(updatedEarnings);
  };

  const filteredEarnings =
    filterCategory === 'All' ? earnings : earnings.filter((earning) => earning.category === filterCategory);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{editIndex !== null ? 'Edit Earning' : 'Add Earning'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Category:
          <select value={earnCategory} onChange={handleCategoryChange} className={styles.input}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Amount:
          <input
            type="number"
            value={earnAmount}
            onChange={handleAmountChange}
            className={styles.input}
            placeholder="Enter amount"
          />
        </label>
        <button type="submit" className={styles.button}>
          {editIndex !== null ? 'Update Earning' : 'Add Earning'}
        </button>
      </form>

      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>
          Filter by Category:
          <select value={filterCategory} onChange={handleFilterChange} className={styles.filterSelect}>
            <option value="All">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <h3 className={styles.historyHeading}>Earning History</h3>
      {filteredEarnings.length === 0 ? (
        <p className={styles.noEarnings}>No earnings to display.</p>
      ) : (
        <ul className={styles.historyList}>
          {filteredEarnings.map((earning, index) => (
            <li key={index} className={styles.historyItem}>
              <div className={styles.historyDetails}>
                {filterCategory === 'All' && <div className={styles.earningCategory}>{earning.category}</div>}
                <div className={styles.earningInfo}>
                  <span className={styles.earningAmount}>₹{earning.amount.toFixed(2)}</span>
                  <span className={styles.earningDate}>{earning.date}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(index)} className={styles.editButton}>
                  <PencilIcon className={styles.icon} />
                </button>
                <button onClick={() => handleDelete(index)} className={styles.deleteButton}>
                  <TrashIcon className={styles.icon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {earnings.length > 0 && (
        <h3 className={styles.totalHeading}>
          Total Earnings: ₹{earnings.reduce((total, earning) => total + earning.amount, 0).toFixed(2)}
        </h3>
      )}
    </div>
  );
};

export default Earn;
