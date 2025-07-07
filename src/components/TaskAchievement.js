import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskAchievement.css';

const TaskAchievement = ({ taskType = 'Task 2' }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [submittedText, setSubmittedText] = useState('');
  const [submittedWordCount, setSubmittedWordCount] = useState(0);
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
  const taskCriteria = {
    'Task 1': [
      {
        id: 1,
        requirement: 'Addresses all parts of the task',
        description: 'Presents a clear overview of main trends, differences or stages',
        achieved: true,
        explanation: 'The response successfully identifies and describes the main trends in the data with clear comparisons between different categories.'
      },
      {
        id: 2,
        requirement: 'Presents information appropriately',
        description: 'Selects and reports the main features clearly',
        achieved: true,
        explanation: 'Key features are well-selected and presented in a logical sequence with appropriate emphasis on significant data points.'
      },
      {
        id: 3,
        requirement: 'Makes relevant comparisons',
        description: 'Uses data to support descriptions and makes appropriate comparisons',
        achieved: false,
        explanation: 'Some comparisons are made but they could be more specific. More detailed comparison between peak and lowest values would strengthen the response.'
      },
      {
        id: 4,
        requirement: 'Meets word count requirement',
        description: 'Writes at least 150 words',
        achieved: true,
        explanation: 'The response contains 168 words, meeting the minimum requirement with appropriate detail.'
      }
    ],
    'Task 2': [
      {
        id: 1,
        requirement: 'Addresses all parts of the task',
        description: 'Responds to all aspects of the question with relevant ideas',
        achieved: true,
        explanation: 'The essay addresses both views on technology in education and provides a clear personal opinion with supporting arguments.'
      },
      {
        id: 2,
        requirement: 'Presents a clear position',
        description: 'Develops a clear thesis and maintains it throughout',
        achieved: true,
        explanation: 'A clear stance is established in the introduction and consistently maintained with logical development throughout the essay.'
      },
      {
        id: 3,
        requirement: 'Supports ideas with examples',
        description: 'Uses relevant examples and evidence to support main points',
        achieved: false,
        explanation: 'Main ideas are present but lack specific examples. Adding concrete examples or case studies would significantly strengthen the arguments.'
      },
      {
        id: 4,
        requirement: 'Reaches appropriate conclusion',
        description: 'Provides a logical conclusion that follows from the arguments',
        achieved: true,
        explanation: 'The conclusion effectively summarizes the main points and restates the position clearly without introducing new ideas.'
      },
      {
        id: 5,
        requirement: 'Meets word count requirement',
        description: 'Writes at least 250 words',
        achieved: true,
        explanation: 'The essay contains 287 words, comfortably meeting the minimum requirement with adequate development of ideas.'
      }
    ]
  };

  const currentCriteria = taskCriteria[taskType] || taskCriteria['Task 2'];
  const achievedCount = currentCriteria.filter(item => item.achieved).length;
  const totalCount = currentCriteria.length;
  const achievementPercentage = Math.round((achievedCount / totalCount) * 100);

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getScoreBand = (percentage) => {
    if (percentage >= 90) return { band: 9, label: 'Expert User' };
    if (percentage >= 80) return { band: 8, label: 'Very Good User' };
    if (percentage >= 70) return { band: 7, label: 'Good User' };
    if (percentage >= 60) return { band: 6, label: 'Competent User' };
    if (percentage >= 50) return { band: 5, label: 'Modest User' };
    if (percentage >= 40) return { band: 4, label: 'Limited User' };
    return { band: 3, label: 'Extremely Limited User' };
  };

  const scoreBand = getScoreBand(achievementPercentage);

  const handleBackToInput = () => {
    navigate('/');
  };

  return (
    <div className="task-achievement-container">
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

      <div className="task-achievement-header">
        <div className="header-content">
          <h2>Task Achievement Assessment</h2>
          <p className="task-type">{taskType} Evaluation</p>
        </div>
        <div className="overall-score">
          <div className="score-circle">
            <span className="band-number">{scoreBand.band}</span>
            <span className="band-label">{scoreBand.label}</span>
          </div>
        </div>
      </div>

      <div className="achievement-summary">
        <div className="progress-bar-container">
          <div className="progress-info">
            <span>Task Requirements Met</span>
            <span className="progress-text">{achievedCount}/{totalCount} ({achievementPercentage}%)</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${achievementPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="criteria-list">
        <h3>Assessment Criteria</h3>
        {currentCriteria.map((criterion) => (
          <div 
            key={criterion.id} 
            className={`criterion-item ${criterion.achieved ? 'achieved' : 'not-achieved'}`}
          >
            <div className="criterion-header" onClick={() => toggleExpanded(criterion.id)}>
              <div className="criterion-main">
                <div className="achievement-indicator">
                  {criterion.achieved ? (
                    <div className="checkmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="crossmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="criterion-content">
                  <h4 className="requirement-title">{criterion.requirement}</h4>
                  <p className="requirement-description">{criterion.description}</p>
                </div>
                <div className="status-badge">
                  <span className={`badge ${criterion.achieved ? 'achieved' : 'not-achieved'}`}>
                    {criterion.achieved ? 'Achieved' : 'Not Achieved'}
                  </span>
                </div>
              </div>
              <div className="expand-icon">
                <svg 
                  className={`chevron ${expandedItems.has(criterion.id) ? 'expanded' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
            </div>
            
            {expandedItems.has(criterion.id) && (
              <div className="criterion-explanation">
                <div className="explanation-content">
                  <h5>Detailed Feedback:</h5>
                  <p>{criterion.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskAchievement;