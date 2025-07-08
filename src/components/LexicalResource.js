import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import './LexicalResource.css';

const LexicalResource = () => {
  // Raw data from API (word -> CEFR level mapping)
  const dataRaw = {
    'hello': 'A1', 
    'hi': 'A2', 
    'excellent': 'B2',
    'good': 'A2',
    'wonderful': 'B1',
    'amazing': 'B1',
    'sophisticated': 'C1',
    'extraordinary': 'C2',
    'beautiful': 'A2',
    'complex': 'B2',
    'intricate': 'C1',
    'multifaceted': 'C2'
  };

  // Function to transform dataRaw into CEFR level counts
  const transformToCEFRCounts = (rawData) => {
    const counts = {};
    
    // Initialize all CEFR levels with 0
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(level => {
      counts[level] = 0;
    });
    
    // Count words by CEFR level
    Object.values(rawData).forEach(level => {
      if (counts.hasOwnProperty(level)) {
        counts[level]++;
      }
    });
    
    return counts;
  };

  // Transformed data (CEFR level -> count mapping)
  const data = transformToCEFRCounts(dataRaw);

  // Transform CEFR data into chart format
  const chartData = Object.entries(data).map(([level, count]) => ({
    level,
    count,
  }));

  return (
    <div className="lexical-resource-container">
      <h3 className="lexical-resource-title">
        Lexical Resource - Words by CEFR Level
      </h3>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="count" 
              fill="#3182ce" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default LexicalResource;
