// src/components/Dashboard/UpcomingTests.js
import React from 'react';
import Card from './Card'; // Adjust path as necessary

const UpcomingTests = () => {
  const tests = [
    { name: "Machine Learning Midterm", type: "Midterm", date: "Nov 5, 2025", time: "2:00 PM" },
    { name: "Data Structures Quiz", type: "Quiz", date: "Nov 8, 2025", time: "10:00 AM" },
    { name: "Cloud Computing Final", type: "Final", date: "Nov 15, 2025", time: "1:00 PM" },
    { name: "Web Dev Assignment", type: "Assignment", date: "Nov 10, 2025", time: "11:59 PM" },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Midterm': return 'bg-red-600';
      case 'Quiz': return 'bg-blue-600';
      case 'Final': return 'bg-pink-600';
      case 'Assignment': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card title="Upcoming Tests">
      <div className="space-y-4">
        {tests.map((test, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold">{test.name}</h3>
              <p className="text-sm text-gray-400 flex items-center">
                <span className="material-icons-outlined text-base mr-1">🗓️</span> {test.date} <span className="mx-2">|</span> 
                <span className="material-icons-outlined text-base mr-1">⏰</span> {test.time}
              </p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTypeColor(test.type)}`}>
              {test.type}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingTests;