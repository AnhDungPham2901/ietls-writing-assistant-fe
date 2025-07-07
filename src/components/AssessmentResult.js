import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskAchievement from './TaskAchievement';
import GrammaticalRange from './GrammaticalRange';
import './AssessmentResult.css';

const AssessmentResult = ({ taskType = 'Task 2' }) => {
  const [submittedText, setSubmittedText] = useState('');
  const [submittedWordCount, setSubmittedWordCount] = useState(0);
  const [activeTab, setActiveTab] = useState('task-achievement');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve submitted text from localStorage
    const text = localStorage.getItem('submittedText') || '';
    const wordCount = parseInt(localStorage.getItem('submittedWordCount') || '0');
    setSubmittedText(text);
    setSubmittedWordCount(wordCount);

    // If no text was submitted, redirect back to home
    if (!text.trim()) {
      navigate('/');
    }
  }, [navigate]);

  const handleBackToInput = () => {
    navigate('/');
  };

  return (
    <div className="assessment-result-container">
      <div className="back-button-container">
        <button onClick={handleBackToInput} className="back-button">
          ← Back to Writing Input
        </button>
      </div>

      {submittedText && (
        <div className="submitted-text-preview">
          <h3>Your Submitted Text ({submittedWordCount} words)</h3>
          <div className="text-preview">
            {submittedText.length > 200 
              ? `${submittedText.substring(0, 200)}...` 
              : submittedText
            }
          </div>
        </div>
      )}

      <div className="assessment-tabs">
        <button 
          className={`tab-button ${activeTab === 'task-achievement' ? 'active' : ''}`}
          onClick={() => setActiveTab('task-achievement')}
        >
          Task Achievement
        </button>
        <button 
          className={`tab-button ${activeTab === 'grammatical-range' ? 'active' : ''}`}
          onClick={() => setActiveTab('grammatical-range')}
        >
          Grammatical Range & Accuracy
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'task-achievement' && (
          <div className="tab-panel">
            <TaskAchievement taskType={taskType} />
          </div>
        )}
        {activeTab === 'grammatical-range' && (
          <div className="tab-panel">
            <GrammaticalRange />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentResult;