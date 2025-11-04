// src/pages/Dashboard.js
import React from 'react';
import Navbar from '../../components/AuthComponents/Navbar'; // Adjust path as needed

// Import all the new Dashboard-specific components
import ProfileCard from '../../components/DashboardComponents/ProfileCard';
import CoursesOverview from '../../components/DashboardComponents/CoursesOverview';
import TestPerformance from '../../components/DashboardComponents/TestPerformance';
import UpcomingTests from '../../components/DashboardComponents/UpcomingTests';
import TopicsToImprove from '../../components/DashboardComponents/TopicsToImprove';
import RecommendedCourses from '../../components/DashboardComponents/RecommendedCourses';
import CalendarCard from '../../components/DashboardComponents/CalendarCard';
import InterestedTopics from '../../components/DashboardComponents/InterestedTopics';

const Dashboard = () => {
  return (
    <>
      {/* Set the background and font for the entire page */}
        <Navbar />
      <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-6 lg:p-8">
        <div className='mt-8 mx-12'>
            <ProfileCard /> {/* This now includes CalendarCard internally */}

        </div>

        {/* Main Dashboard Grid: Two columns */}
        <div className="mt-8 grid grid-cols-12 lg:grid-cols-2 gap-6 mx-12">
          
          {/* LEFT COLUMN: Wider (e.g., span 8/12 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <CalendarCard/>
            <CoursesOverview />
            <TestPerformance />
            <UpcomingTests />
          </div>

          {/* RIGHT COLUMN: Narrower (e.g., span 4/12 columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* CalendarCard is now part of ProfileCard */}
            <TopicsToImprove />
            <RecommendedCourses />
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;