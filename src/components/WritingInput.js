import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritingInput.css';

const WritingInput = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    
    // Calculate word count
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleClear = () => {
    setText('');
    setWordCount(0);
  };

  const handlePaste = (e) => {
    // Allow default paste behavior, but update word count after paste
    setTimeout(() => {
      const pastedText = e.target.value;
      const words = pastedText.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }, 0);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      console.log('Submitted text:', text);
      console.log('Word count:', wordCount);
      
      // Store the submitted text in localStorage or state management
      localStorage.setItem('submittedText', text);
      localStorage.setItem('submittedWordCount', wordCount.toString());
      
      // Navigate to assessment page
      navigate('/assessment');
    } else {
      alert('Please enter some text before submitting.');
    }
  };

  return (
    <div className="writing-input-container">
      <div className="writing-input-header">
        <h2>IELTS Writing Assistant</h2>
        <p>Paste or type your essay below for analysis and feedback</p>
      </div>
      
      <div className="writing-input-controls">
        <div className="word-count">
          <span className="word-count-label">Word Count:</span>
          <span className="word-count-number">{wordCount}</span>
        </div>
        <button 
          className="clear-button" 
          onClick={handleClear}
          disabled={text.length === 0}
        >
          Clear
        </button>
      </div>

      <div className="writing-input-area">
        <textarea
          value={text}
          onChange={handleTextChange}
          onPaste={handlePaste}
          placeholder="Paste your IELTS writing task here or start typing your essay..."
          className="writing-textarea"
          rows={15}
          maxLength={5000}
        />
      </div>

      <div className="submit-section">
        <button 
          onClick={handleSubmit}
          className="submit-button"
          disabled={!text.trim()}
        >
          Submit to assess
        </button>
      </div>

      <div className="writing-input-info">
        <div className="tips">
          <p><strong>Writing Tips:</strong></p>
          <ul>
            <li>IELTS Task 1: Aim for 150+ words (describe graphs, charts, or diagrams)</li>
            <li>IELTS Task 2: Aim for 250+ words (essay format with clear introduction, body, and conclusion)</li>
            <li>Use formal academic language and avoid contractions</li>
            <li>Plan your essay structure before writing</li>
            <li>Check grammar, spelling, and punctuation carefully</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WritingInput;