import React, { useState } from 'react';
import styles from './Expense.module.css';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Expense = ({ expenses, setExpenses }) => {
  const [expenseType, setExpenseType] = useState('Food');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [filter, setFilter] = useState('All');
  const [editIndex, setEditIndex] = useState(null);

  const handleTypeChange = (event) => {
    setExpenseType(event.target.value);
  };

  const handleNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!expenseName || !expenseAmount) return;

    const currentDate = new Date().toLocaleDateString();
    const newExpense = { type: expenseType, name: expenseName, amount: parseFloat(expenseAmount), date: currentDate };

    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    }

    setExpenseType('Food');
    setExpenseName('');
    setExpenseAmount('');
  };

  const handleEdit = (index) => {
    const expenseToEdit = expenses[index];
    setExpenseType(expenseToEdit.type);
    setExpenseName(expenseToEdit.name);
    setExpenseAmount(expenseToEdit.amount);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredExpenses = filter === 'All' ? expenses : expenses.filter(expense => expense.type === filter);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{editIndex !== null ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Expense Type:
          <select value={expenseType} onChange={handleTypeChange} className={styles.input}>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className={styles.label}>
          Expense detail:
          <input
            type="text"
            value={expenseName}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Enter expense detail"
          />
        </label>
        <label className={styles.label}>
          Amount:
          <input
            type="number"
            value={expenseAmount}
            onChange={handleAmountChange}
            className={styles.input}
            placeholder="Enter amount"
          />
        </label>
        <button type="submit" className={styles.button}>
          {editIndex !== null ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>
          Filter by Type:
          <select value={filter} onChange={handleFilterChange} className={styles.filterSelect}>
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      <h3 className={styles.historyHeading}>Expense History</h3>
      {filteredExpenses.length === 0 ? (
        <p className={styles.noExpenses}>No expenses to display.</p>
      ) : (
        <ul className={styles.historyList}>
          {filteredExpenses.map((expense, index) => (
            <li key={index} className={styles.historyItem}>
              <div className={styles.historyDetails}>
                {filter === 'All' && <div className={styles.expenseType}>{expense.type}</div>}
                <div className={styles.expenseInfo}>
                  <span className={styles.expenseName}>{expense.name}</span>
                  <span className={styles.expenseAmount}>₹{expense.amount.toFixed(2)}</span>
                </div>
                <div className={styles.expenseDate}>{expense.date}</div>
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

      {expenses.length > 0 && (
        <h3 className={styles.totalHeading}>Total Expenses: ₹{expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</h3>
      )}
    </div>
  );
};

export default Expense;
