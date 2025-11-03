// src/components/Dashboard/CoursesOverview.js
import React from 'react';
import Card from './Card'; // Adjust path as necessary
import CourseProgressCard from './CourseProgressCard'; // The reusable progress item

const CoursesOverview = () => {
  const enrolledCoursesData = [
    { name: "Advanced Machine Learning", instructor: "Dr. Sarah Johnson", progress: 75 },
    { name: "Data Structures & Algorithms", instructor: "Prof. Michael Chen", progress: 60 },
    { name: "Cloud Architecture", instructor: "Dr. Emily Rodriguez", progress: 85 },
    { name: "Full Stack Development", instructor: "Prof. David Kim", progress: 45 },
  ];

  const attendanceData = [
    { subject: "Machine Learning", instructor: "Prof. Anderson", present: 10, late: 1, absent: 1, completed: 11, total: 12, percentage: 92 },
    { subject: "Data Structures", instructor: "Dr. Martinez", present: 14, late: 0, absent: 1, completed: 14, total: 15, percentage: 93 },
    { subject: "Cloud Computing", instructor: "Prof. Chen", present: 9, late: 1, absent: 0, completed: 10, total: 10, percentage: 100 },
    { subject: "Web Development", instructor: "Dr. Williams", present: 6, late: 1, absent: 1, completed: 7, total: 8, percentage: 88 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Enrolled Courses */}
      <Card title="Enrolled Courses">
        {enrolledCoursesData.map((course, index) => (
          <CourseProgressCard 
            key={index}
            name={course.name}
            instructor={course.instructor}
            progress={course.progress}
            // For simplicity, attendance count isn't in this data, mock it if needed
            classesCompleted={Math.round(course.progress / 100 * 12)} // Example mock
            totalClasses={12} // Example mock
          />
        ))}
      </Card>

      {/* Attendance by Subject */}
      <Card title="Attendance by Subject">
        <div className="mb-4 pb-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Overall Attendance <span className="float-right text-green-400 font-bold">93%</span></h3>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> {39} Present</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span> {3} Late</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> {3} Absent</span>
          </div>
        </div>

        {attendanceData.map((subject, index) => (
          <div key={index} className="border-b border-gray-700 py-3 last:border-b-0">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold">{subject.subject} <span className="text-sm text-gray-400">({subject.instructor})</span></h4>
              <span className={`font-bold ${subject.percentage >= 90 ? 'text-green-400' : 'text-blue-400'}`}>
                {subject.percentage}%
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <span className="flex items-center"><span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1"></span> {subject.present}</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-1"></span> {subject.late}</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-1"></span> {subject.absent}</span>
              <span className="ml-auto">{subject.completed}/{subject.total} classes</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CoursesOverview; 