// Function to get raw lexical data from API (word -> CEFR level mapping)
export const getDataRaw = async (text) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/word-level-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text || 'hello hi excellent good wonderful amazing sophisticated extraordinary beautiful complex intricate multifaceted' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('API Error:', data.error);
      return getFallbackData();
    }

    return data;
  } catch (error) {
    console.error('Error fetching word levels:', error);
    return getFallbackData();
  }
};

// Fallback data in case API fails
const getFallbackData = () => {
  return {
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
};

// Function to transform dataRaw into CEFR level counts
export const transformToCEFRCounts = (rawData) => {
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
