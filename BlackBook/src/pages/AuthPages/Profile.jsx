import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/AuthComponents/Navbar';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:9090/api/user/profile');
                setUser(res.data);
            } catch (err) {
                console.error('Error fetching user profile:', err);
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

    const renderDetail = (label, value) => (
        <div className="grid grid-cols-3 gap-4 items-center">
            <h3 className="text-gray-400 font-semibold col-span-1">{label}</h3>
            <p className="text-white col-span-2">{value || 'Not provided'}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <Navbar />
            <div className="container mx-auto p-4 md:p-8">
                <div className="relative">
                    {/* Header with Background Image */}
                    <div
                        className="h-48 md:h-64 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: "url('https://4kwallpapers.com/images/walls/thumbs_2t/24066.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-black opacity-50 rounded-t-lg"></div>
                    </div>

                    {/* Profile Picture and Name */}
                    <div className="relative flex flex-col md:flex-row items-center md:items-end p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-6 -mt-20 md:-mt-24">
                        {user?.imageUrl ? (
                            <img
                                src={user.imageUrl}
                                alt="Profile"
                                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-gray-800 shadow-lg"
                            />
                        ) : (
                            <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-700 rounded-full border-4 border-gray-800 flex items-center justify-center shadow-lg">
                                <span className="text-gray-400">No Image</span>
                            </div>
                        )}
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-4xl font-bold text-white">{user?.fullname}</h1>
                            <p className="text-gray-400 text-sm md:text-base">@{user?.username}</p>
                        </div>
                    </div>
                </div>

                {/* User Details Card */}
                <div className="bg-gray-800 p-6 rounded-b-lg md:rounded-lg shadow-xl mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {renderDetail('Email', user?.email)}
                        {renderDetail('Institute', user?.institute)}
                        {renderDetail('Rank', user?.rank || 'N/A')}
                        {renderDetail('Institute Rank', user?.instituteRank || 'N/A')}
                        <div className="md:col-span-2">
                             {renderDetail('Bio', user?.bio || 'N/A')}
                        </div>
                    </div>
                    <div className="mt-8 text-right">
                        <Link
                            to="/settings"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;