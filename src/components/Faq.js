

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Faq.css';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null); // State to handle which FAQ is being edited

  useEffect(() => {
    axios.get('http://localhost:5000/faqs').then((res) => setFaqs(res.data));
    console.log(faqs)
  }, []);

  const addFaq = () => {
    const newFaq = { question, answer };
    axios.post('http://localhost:5000/faqs', newFaq).then((res) => {
      setFaqs([...faqs, res.data]);
      setQuestion('');
      setAnswer('');
    });
  };

  const updateFaq = () => {
    const updatedFaq = { question, answer };
    axios.put(`http://localhost:5000/faqs/${editId}`, updatedFaq).then((res) => {
      setFaqs(faqs.map((faq) => (faq._id === editId ? res.data : faq)));
      setQuestion('');
      setAnswer('');
      setEditId(null);
    });
  };

  const deleteFaq = (id) => {
  console.log('Deleting FAQ with ID:', id); // Debugging line
  axios.delete(`http://localhost:5000/faqs/${id}`).then(() => {
    setFaqs(faqs.filter((faq) => faq._id !== id));
  }).catch(err => {
    console.error('Error deleting FAQ:', err);
  });
};


  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq._id);
  };

  return (
    <div className="faq-container">
      <h2>FAQ Page</h2>
      <input
        className="faq-input"
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        className="faq-input"
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        className="faq-button"
        onClick={editId ? updateFaq : addFaq}
      >
        {editId ? 'Update FAQ' : 'Add FAQ'}
      </button>

      <ul className="faq-list">
        {faqs.map((faq) => (
          <li key={faq._id} className="faq-item">
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
            <button onClick={() => handleEdit(faq)} className="faq-button">Edit</button>
            <button onClick={() => deleteFaq(faq._id)} className="faq-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
