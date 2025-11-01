// src/components/Dashboard/ProfileCard.js
import React, { useEffect, useState } from 'react';
import Card from './Card'; // Adjust path as necessary
// import CalendarCard from './CalendarCard'; // Import the new CalendarCard
import axios from 'axios';

const ProfileCard = () => {
    // Data placeholders based on the screenshot
    const metrics = [
        { label: 'Active Courses', value: '4', icon: '📖' }, // Using emojis for mock icons
        { label: 'Avg Score', value: '87.5%', icon: '💯' },
        { label: 'Day Streak', value: '12', icon: '🔥' },
        { label: 'Achievements', value: '28', icon: '🏆' },
    ];

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('No token found, redirecting to login.');
                    setLoading(false);
                    return;
                }
                // Fetch user data from your API
                const res = await axios.get('http://localhost:9090/me', 
                    {
                        headers:{
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                console.log('Fetched user data:', res.data);
                setUser(res.data);
            } catch (err) {
                console.error('Error fetching user profile:', err);
                alert('Failed to fetch user profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }


    

    return (
      <Card className="md:col-span-3"> 
            
            {/* Main Flex Container: This pushes the metrics to the right of the name/picture block */}
            <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
                
                {/* 1. Profile Picture and Name Block (LEFT/START) */}
                <div className="flex items-start space-x-6">
                    {/* Profile Image */}
                    <span>
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <span>{user?.name ? user.name.charAt(0) : 'U'}</span>
                        )}
                    </span>
                    
                    {/* Name and Title Block */}
                    <div>
                        <h1 className="text-2xl font-extrabold">{user?.fullName}</h1>
                        <p className="text-sm text-gray-400">{user?.bio}</p>
                    </div>
                </div>

                {/* 2. Metrics Row (RIGHT/END) */}
                {/* The 'flex-wrap' and 'justify-end' help keep it responsive and right-aligned */}
                <div className="mt-4 sm:mt-0 flex flex-wrap justify-start sm:justify-end gap-x-6 gap-y-2">
                    {metrics.map((m, index) => (
                        // Removed text-center here as it's not needed if we align the container
                        <div key={index} className="text-right"> 
                            <p className="text-lg font-bold text-indigo-400 flex items-center justify-end">
                                <span className="text-base mr-1">{m.icon}</span> {m.value}
                            </p>
                            <p className="text-xs text-gray-500">{m.label}</p>
                        </div>
                    ))}
                </div>
            </div>
              
            </Card>

     
    );
};

export default ProfileCard;