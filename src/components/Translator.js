import React, { useState } from 'react';
import './Translator.css';

const Translator = () => {
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState('');

  const translateText = () => {
    // Dummy translation logic
    setTranslated(input.split('').reverse().join(''));
  };

  return (
    <div className="translator-container">
      <h2>Translator</h2>
      <input
        className="translator-input"
        type="text"
        placeholder="Enter text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="translator-button" onClick={translateText}>Translate</button>
      <p className="translator-result">Translated: {translated}</p>
    </div>
  );
};

export default Translator;
