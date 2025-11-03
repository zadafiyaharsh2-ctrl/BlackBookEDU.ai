// src/components/Dashboard/RecommendedCourses.js
import React from 'react';
import Card from './Card'; // Adjust path as necessary

const RecommendedCourses = () => {
  const courses = [
    {
      name: "Deep Learning Specialization",
      professor: "Prof. Andrew Ng",
      rating: 4.9,
      students: 2400,
      level: "Advanced",
      image: "/mock-images/deep-learning.png" // Mock image for a course card
    },
    {
      name: "Blockchain Fundamentals",
      professor: "Prof. Lisa Wang",
      rating: 4.7,
      students: 1200,
      level: "Beginner",
      image: "/mock-images/blockchain.png" // Mock image for a course card
    },
    // Add more courses if needed
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return 'bg-purple-600';
      case 'Beginner': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card title="Recommended Courses">
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center">
            {/* You could add an image here if you have one for each course */}
            {/* <img src={course.image} alt={course.name} className="w-24 h-24 object-cover rounded-full mb-3" /> */}
            <h3 className="font-semibold text-lg">{course.name}</h3>
            <p className="text-sm text-gray-400">{course.professor}</p>
            <div className="flex items-center text-yellow-400 text-sm mt-2">
              <span className="material-icons-outlined text-base">⭐</span> {course.rating} ({course.students} students)
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full mt-3 ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
            <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendedCourses;