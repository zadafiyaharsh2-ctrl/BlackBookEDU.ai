// src/components/Dashboard/TopicsToImprove.js
import React from 'react';
import Card from './Card'; // Adjust path as necessary

const TopicsToImprove = () => {
  const topics = [
    { name: "Dynamic Programming", course: "Data Structures & Algorithms", score: 45, level: "High" },
    { name: "Neural Networks", course: "Machine Learning", score: 52, level: "High" },
    { name: "Kubernetes", course: "Cloud Architecture", score: 58, level: "Medium" },
    { name: "GraphQL APIs", course: "Full Stack Development", score: 62, level: "Medium" },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card title="Topics to Improve">
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{topic.name}</h3>
                <p className="text-sm text-gray-400">{topic.course}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${getLevelColor(topic.level)}`}>
                {topic.level}
              </span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <button className="flex items-center text-sm text-indigo-400 hover:text-indigo-300">
                <span className="material-icons-outlined text-base mr-1">📚</span> Practice Now
              </button>
              <span className="text-lg font-bold text-gray-300">{topic.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopicsToImprove;