import React, { useState } from 'react';
import './GrammaticalRange.css';

const GrammaticalRange = () => {
  // Sample grammar error data - in real application, this would come from props or API
  const grammarErrors = [
    {
      id: 1,
      errorHeader: 'Using the wrong tense',
      errorSentence: 'I has no idea about this topic.',
      isError: true,
      fixSuggestion: 'I have no idea about this topic.'
    },
    {
      id: 2,
      errorHeader: 'Subject-verb disagreement',
      errorSentence: 'The students is working on their projects.',
      isError: true,
      fixSuggestion: 'The students are working on their projects.'
    },
    {
      id: 3,
      errorHeader: 'Incorrect article usage',
      errorSentence: 'He is a engineer who works at the company.',
      isError: true,
      fixSuggestion: 'He is an engineer who works at the company.'
    },
    {
      id: 4,
      errorHeader: 'Wrong preposition',
      errorSentence: 'She is interested on learning new languages.',
      isError: true,
      fixSuggestion: 'She is interested in learning new languages.'
    },
    {
      id: 5,
      errorHeader: 'Incorrect word form',
      errorSentence: 'The technology has advance significantly.',
      isError: true,
      fixSuggestion: 'The technology has advanced significantly.'
    },
    {
      id: 6,
      errorHeader: 'Run-on sentence',
      errorSentence: 'The weather is nice today I want to go outside.',
      isError: true,
      fixSuggestion: 'The weather is nice today, so I want to go outside.'
    },
    {
      id: 7,
      errorHeader: 'Missing auxiliary verb',
      errorSentence: 'You been working here for long time?',
      isError: true,
      fixSuggestion: 'Have you been working here for a long time?'
    },
    {
      id: 8,
      errorHeader: 'Incorrect conditional form',
      errorSentence: 'If I would have money, I will buy a car.',
      isError: true,
      fixSuggestion: 'If I had money, I would buy a car.'
    }
  ];

  const [expandedErrors, setExpandedErrors] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedErrors);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedErrors(newExpanded);
  };

  const getGrammarScore = (errorCount) => {
    if (errorCount === 0) return { band: 9, label: 'Expert - No errors' };
    if (errorCount <= 2) return { band: 8, label: 'Very Good - Rare errors' };
    if (errorCount <= 4) return { band: 7, label: 'Good - Few errors' };
    if (errorCount <= 6) return { band: 6, label: 'Competent - Some errors' };
    if (errorCount <= 8) return { band: 5, label: 'Modest - Frequent errors' };
    return { band: 4, label: 'Limited - Many errors' };
  };

  const errorCount = grammarErrors.filter(error => error.isError).length;
  const grammarScore = getGrammarScore(errorCount);

  return (
    <div className="grammatical-range-container">
      <div className="grammar-header">
        <div className="header-content">
          <h2>Grammatical Range & Accuracy</h2>
          <p>Grammar errors found in your writing with suggested corrections</p>
        </div>
        <div className="grammar-score">
          <div className="score-circle">
            <span className="band-number">{grammarScore.band}</span>
            <span className="band-label">{grammarScore.label}</span>
          </div>
        </div>
      </div>

      <div className="error-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-number">{errorCount}</span>
            <span className="stat-label">Grammar Errors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{grammarErrors.length - errorCount}</span>
            <span className="stat-label">Correct Sentences</span>
          </div>
        </div>
      </div>

      <div className="errors-list">
        <h3>Grammar Errors & Corrections</h3>
        {grammarErrors.filter(error => error.isError).length === 0 ? (
          <div className="no-errors">
            <div className="success-icon">✅</div>
            <h4>Excellent Grammar!</h4>
            <p>No grammatical errors were found in your writing.</p>
          </div>
        ) : (
          grammarErrors
            .filter(error => error.isError)
            .map((error) => (
              <div key={error.id} className="error-item">
                <div className="error-header" onClick={() => toggleExpanded(error.id)}>
                  <div className="error-main">
                    <div className="error-indicator">
                      <div className="error-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </div>
                    </div>
                    <div className="error-content">
                      <h4 className="error-title">{error.errorHeader}</h4>
                      <div className="error-sentence">
                        <span className="error-label">Incorrect:</span>
                        <span className="incorrect-text">{error.errorSentence}</span>
                      </div>
                    </div>
                  </div>
                  <div className="expand-icon">
                    <svg 
                      className={`chevron ${expandedErrors.has(error.id) ? 'expanded' : ''}`}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>
                
                {expandedErrors.has(error.id) && (
                  <div className="error-fix">
                    <div className="fix-content">
                      <div className="correct-sentence">
                        <span className="fix-label">Suggested Fix:</span>
                        <span className="correct-text">{error.fixSuggestion}</span>
                      </div>
                      <div className="grammar-tip">
                        <div className="tip-icon">💡</div>
                        <div className="tip-text">
                          {getGrammarTip(error.errorHeader)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {errorCount > 0 && (
        <div className="grammar-summary">
          <h3>Summary</h3>
          <div className="summary-content">
            <p>
              <strong>Grammar Assessment:</strong> Your writing contains {errorCount} grammatical {errorCount === 1 ? 'error' : 'errors'}. 
              Focus on the corrections above to improve your grammatical range and accuracy score.
            </p>
            <div className="improvement-areas">
              <h4>Most Common Error Types:</h4>
              <ul>
                {getCommonErrors(grammarErrors).map((errorType, index) => (
                  <li key={index}>{errorType}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get grammar tips based on error type
const getGrammarTip = (errorType) => {
  const tips = {
    'Using the wrong tense': 'Pay attention to time indicators in the sentence. Present tense for current situations, past tense for completed actions.',
    'Subject-verb disagreement': 'Singular subjects take singular verbs, plural subjects take plural verbs. "The student works" vs "The students work".',
    'Incorrect article usage': 'Use "a" before consonant sounds and "an" before vowel sounds. Engineer starts with a vowel sound.',
    'Wrong preposition': 'Some verbs require specific prepositions. "Interested in", "good at", "afraid of" are common combinations.',
    'Incorrect word form': 'Check if you need a noun, verb, adjective, or adverb form. "Advance" (verb) vs "advanced" (past participle/adjective).',
    'Run-on sentence': 'Use punctuation or conjunctions to separate independent clauses. Avoid comma splices.',
    'Missing auxiliary verb': 'Questions and perfect tenses often require auxiliary verbs like "have", "do", "will".',
    'Incorrect conditional form': 'Type 2 conditionals use "If + past simple, would + base verb" for hypothetical situations.'
  };
  return tips[errorType] || 'Review grammar rules for this type of error and practice with similar examples.';
};

// Helper function to identify common error patterns
const getCommonErrors = (errors) => {
  const errorTypes = errors.filter(e => e.isError).map(e => e.errorHeader);
  const frequency = {};
  errorTypes.forEach(type => {
    frequency[type] = (frequency[type] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([type, count]) => `${type} (${count} ${count === 1 ? 'error' : 'errors'})`);
};

export default GrammaticalRange;