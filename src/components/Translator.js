

import { useEffect, useState } from 'react';
import lang from '../languages';
import './Translator.css';

function Translator() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en-GB');
  const [toLanguage, setToLanguage] = useState('hi-IN');
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLanguages(lang);
  }, [lang]);

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  };

  const utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const handleExchange = () => {
    let tempValue = fromText;
    setFromText(toText);
    setToText(tempValue);

    let tempLang = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLang);
  };

  const handleTranslate = () => {
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      });
  };

  const handleIconClick = (target, id) => {
    if (!fromText || !toText) return;

    if (target.classList.contains('fa-copy')) {
      if (id === 'from') {
        copyContent(fromText);
      } else {
        copyContent(toText);
      }
    } else {
      if (id === 'from') {
        utterText(fromText, fromLanguage);
      } else {
        utterText(toText, toLanguage);
      }
    }
  };

  return (
    <>
      <div className="translator-container">
        <div className="textarea-container">
          <textarea
            name="from"
            className="textarea"
            placeholder="Enter Text"
            id="from"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
          ></textarea>

          <textarea
            name="to"
            className="textarea"
            id="to"
            value={toText}
            readOnly
          ></textarea>
        </div>

        <div className="controls">
          <div className="language-controls">
            <button
              className="icon-button"
              onClick={(e) => handleIconClick(e.target, 'from')}
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>
            <button
              className="icon-button"
              onClick={(e) => handleIconClick(e.target, 'from')}
            >
              <i className="fa-solid fa-copy"></i>
            </button>
            <select
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
              className="select"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="exchange-button"
            onClick={handleExchange}
          >
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>

          <div className="language-controls">
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="select"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <button
              className="icon-button"
              onClick={(e) => handleIconClick(e.target, 'to')}
            >
              <i className="fa-solid fa-copy"></i>
            </button>
            <button
              className="icon-button"
              onClick={(e) => handleIconClick(e.target, 'to')}
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="translate-button"
        >
          {loading ? 'Translating...' : 'Translate Text'}
        </button>

        <p className="note">This is a Free API sometimes it gives accurate responses, sometimes it does not.</p>
      </div>
    </>
  );
}

export default Translator;
