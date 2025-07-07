import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WritingInput from './components/WritingInput';
import TaskAchievement from './components/TaskAchievement';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WritingInput />} />
          <Route path="/assessment" element={<TaskAchievement taskType="Task 2" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
