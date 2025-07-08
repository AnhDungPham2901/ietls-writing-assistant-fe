import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import './LexicalResource.css';

const LexicalResource = ({ data = {'A1': 12, 'A2': 23, 'B1': 49, 'B2': 34, 'C1': 23, 'C2': 34} }) => {
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
