import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WritingInput from './components/WritingInput';
import AssessmentResult from './components/AssessmentResult';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WritingInput />} />
          <Route path="/assessment" element={<AssessmentResult taskType="Task 2" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
