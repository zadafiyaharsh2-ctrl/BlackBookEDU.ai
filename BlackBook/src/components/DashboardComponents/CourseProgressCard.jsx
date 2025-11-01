// src/components/CourseProgressCard.js
import React from 'react';

const CourseProgressCard = ({ name, instructor, progress, classesCompleted, totalClasses }) => {
    // Tailwind's `w-[x]` allows for arbitrary values, useful for progress bars
    const progressBarWidth = `w-[${progress}%]`;
    const progressColor = progress >= 90 ? 'bg-green-500' : 'bg-blue-500';

    return (
        <div className="border-b border-gray-700 py-4 last:border-b-0">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-gray-400">{instructor}</p>
                </div>
                <div className={`text-sm font-bold ${progress >= 90 ? 'text-green-400' : 'text-blue-400'}`}>
                    {progress}%
                </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${progressBarWidth} ${progressColor}`}></div>
            </div>

            {/* Metrics (10/12 classes, etc. - simplified for this example) */}
            <p className="text-xs text-gray-500 mt-1">
                {classesCompleted}/{totalClasses} classes
            </p>
        </div>
    );
};

// Example usage within CoursesOverview.js:
/* <CourseProgressCard 
    name="Data Structures" 
    instructor="Dr. Martinez" 
    progress={93} 
    classesCompleted={11} 
    totalClasses={12} 
/>
*/

export default CourseProgressCard;