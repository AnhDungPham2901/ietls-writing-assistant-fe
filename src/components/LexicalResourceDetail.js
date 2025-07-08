import React, { useState, useMemo } from 'react';
import { getDataRaw } from '../utils/lexicalData';
import './LexicalResourceDetail.css';

const LexicalResourceDetail = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  
  // Get raw data
  const dataRaw = getDataRaw();
  
  // Available CEFR levels
  const cefrLevels = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  // Filter words based on selected level
  const filteredWords = useMemo(() => {
    const wordEntries = Object.entries(dataRaw);
    
    if (selectedLevel === 'All') {
      return wordEntries;
    }
    
    return wordEntries.filter(([word, level]) => level === selectedLevel);
  }, [dataRaw, selectedLevel]);
  
  // Get count for current filter
  const filteredCount = filteredWords.length;
  const totalCount = Object.keys(dataRaw).length;

  return (
    <div className="lexical-resource-detail-container">
      <h3 className="detail-title">Lexical Resource - Word Details</h3>
      
      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="level-filter" className="filter-label">
          Filter by CEFR Level:
        </label>
        <select
          id="level-filter"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="level-filter-select"
        >
          {cefrLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      
      {/* Count Indicator */}
      <div className="count-indicator">
        Showing {filteredCount} of {totalCount} words
        {selectedLevel !== 'All' && (
          <span className="level-badge level-{selectedLevel.toLowerCase()}">
            {selectedLevel} Level
          </span>
        )}
      </div>
      
      {/* Words List */}
      <div className="words-list">
        {filteredWords.length > 0 ? (
          filteredWords.map(([word, level]) => (
            <div key={word} className="word-item">
              <span className="word-text">{word}</span>
              <span className={`level-tag level-${level.toLowerCase()}`}>
                {level}
              </span>
            </div>
          ))
        ) : (
          <div className="no-words">
            No words found for the selected level.
          </div>
        )}
      </div>
    </div>
  );
};

export default LexicalResourceDetail;
