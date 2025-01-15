import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { WalletIcon } from '@heroicons/react/24/outline';
import './App.css';
import Expense from './Components/Expense/Expense';
import Earn from './Components/Earn/Earn';
import Balance from './Components/Balance/Balance';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Notified from './Components/Notified/Notified'; // Import Notified component

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <WalletIcon className="logo" />
        <Link to="/">my-money</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/expense">Expense</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/earn">Earn</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/balance">Balance</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/notified">Notified</Link> 
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const [earnings, setEarnings] = useState(() => {
    const storedEarnings = localStorage.getItem('earnings');
    return storedEarnings ? JSON.parse(storedEarnings) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('earnings', JSON.stringify(earnings));
  }, [earnings]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalEarnings = earnings.reduce((total, earning) => total + earning.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/expense" element={<Expense expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/earn" element={<Earn earnings={earnings} setEarnings={setEarnings} />} />
        <Route path="/balance" element={<Balance totalEarnings={totalEarnings} totalExpenses={totalExpenses} />} />
        <Route path="/notified" element={<Notified totalEarnings={totalEarnings} totalExpenses={totalExpenses}/>} /> {/* Add route for Notified */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
