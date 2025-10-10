import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/AuthComponents/Navbar';

// A reusable component for the statistic cards
const StatCard = ({ title, value }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
        <h3 className="text-gray-400 uppercase tracking-wider text-sm font-semibold">{title}</h3>
        <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
);

// A reusable component for each detail row in the main profile card
const ProfileDetail = ({ label, value }) => (
    <div className="flex items-center space-x-4">
        <h3 className="w-36 text-gray-400 font-semibold uppercase text-sm">{label}</h3>
        <p className="text-white flex-1">{value || 'Not provided'}</p>
    </div>
);


const ProfilePage = () => {
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
                // Set some mock data on error to see the layout
                setUser({
                    fullname: "Deepesh (Error) ",
                    userName: "deepesh123 Error",
                    email: "deepesh@example.com",
                    institute: "IIIT Surat",
                    rank: "125",
                    instituteRank: "15",
                    imageUrl: ""
                });
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
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <Navbar />
            <div className="container mx-auto p-4 sm:p-6 md:p-8">

                {/* --- Main Profile Info Card --- */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-6">
                    {/* Profile Picture */}
                    {user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt="Profile"
                            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border-2 border-gray-700"
                        />
                    ) : (
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-700 rounded-lg border-2 border-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}

                    {/* User Details */}
                    <div className="flex-1 w-full space-y-4">
                        <ProfileDetail label="Name" value={user?.userName} />
                        <ProfileDetail label="Username" value={user?.userName} />
                        <ProfileDetail label="Email" value={user?.email} />
                        <ProfileDetail label="Institute" value={user?.institute} />
                        <ProfileDetail label="Rank" value={user?.rank} />
                        <ProfileDetail label="Institute Rank" value={user?.instituteRank} />
                    </div>
                </div>

                {/* --- Stats Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <StatCard title="Students Average Engaging Time" value="3:30" />
                    <StatCard title="Daily Average Problem Solve" value="50" />
                    <StatCard title="Average Points" value="2000" />
                </div>
                
                {/* --- Edit Profile Button --- */}
                <div className="mt-8 text-center md:text-right">
                    <Link
                        to="/settings" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;