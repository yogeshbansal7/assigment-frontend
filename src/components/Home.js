import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="header">
        <h2 className="title">Fruit.Ai</h2>
        <p className="tagline">"Be Healthy!"</p>
      </div>
      
      <div className="button-grid">
        <Link to="/chatbot" className="grid-item chat">
          Chat
        </Link>
        <Link to="/translator" className="grid-item translate">
          {/* <img src="google_translate_icon_url" alt="Translate" /> */}
          Translator
        </Link>
        <Link to="/faq" className="grid-item faq">
          FAQs
        </Link>
        <Link to="/about" className="grid-item about">
          About
        </Link>
      </div>

      <div className="dots-indicator">
        <div className="dot"></div>
        <div className="dot active"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Home;
