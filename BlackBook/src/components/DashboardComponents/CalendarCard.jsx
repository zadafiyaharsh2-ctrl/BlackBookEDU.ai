// src/components/Dashboard/CalendarCard.js
import React from 'react';
import Card from './Card'; // Adjust path as necessary

const CalendarCard = () => {
  return (
    <Card title="Calendar">
      {/* Mock image for calendar, adjust path as needed */}
      <img src="/mock-images/calendar-mock.png" alt="Calendar" className="w-full h-auto rounded-md" />
      <div className="mt-4 text-sm space-y-2">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Exams
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Assignments
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Classes
        </div>
      </div>
    </Card>
  );
};

export default CalendarCard;