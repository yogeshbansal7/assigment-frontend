import React, { useState } from 'react';
import './Chatbot.css';

const fruits = [
  { id: 1, name: 'Apple', description: 'A sweet red fruit' },
  { id: 2, name: 'Banana', description: 'A yellow tropical fruit' }
];

const Chatbot = () => {
  const [selectedFruit, setSelectedFruit] = useState(null);

  return (
    <div className="chatbot-container">
      <h2>Chatbot - Fruits List</h2>
      <div className="fruit-list">
        {fruits.map(fruit => (
          <div key={fruit.id} className="fruit-card" onClick={() => setSelectedFruit(fruit)}>
            <h3 className="fruit-name">{fruit.name}</h3>
          </div>
        ))}
      </div>
      {selectedFruit && (
        <div className="fruit-details">
          <h2 className="fruit-name">{selectedFruit.name}</h2>
          <p className="fruit-description">{selectedFruit.description}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
