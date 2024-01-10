import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App;