// src/components/Dashboard/TestPerformance.js
import React from 'react';
import Card from './Card'; // Adjust path as necessary

const TestPerformance = () => {
  return (
    <Card title="Last Test Performance">
      {/* Mock image for the bar chart. Make sure this path exists. */}
      {/* This image captures the bar chart from Image 1 and Image 4 */}
      <img src="/mock-images/test-performance-chart.png" alt="Last Test Performance Chart" className="w-full h-auto rounded-md" />
      <div className="mt-4 flex justify-center text-sm">
        <span className="flex items-center mr-4"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Your Score</span>
        <span className="flex items-center"><span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span> Class Average</span>
      </div>
    </Card>
  );
};

export default TestPerformance;