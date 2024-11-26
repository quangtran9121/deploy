import logo from './logo.svg';
import './App.css';
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import Main from './Layout/Main/Main';
import AuthPopup from './Layout/Header/AuthPopup';
import React, { useState } from 'react';
import Chatbot from './chatbot/chatbot';




function App() {
  return (
  
    <div className="App">
      <Header />
      {/* Pop-up đăng nhập/đăng ký */}
      {/* <AuthPopup isAuthOpen={isAuthOpen} onClose={handleCloseAuth} /> */}
      <Main/>
      {/* <Chatbot /> */}
      <Footer/>
    </div>
  );
}

export default App;
