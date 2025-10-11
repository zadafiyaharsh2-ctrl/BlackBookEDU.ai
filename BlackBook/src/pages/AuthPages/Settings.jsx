import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        bio: '',
        institute: '',
        rank: '',
        instituteRank: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');

                if (!token) {
                    console.error("No token found, user is not authenticated.");
                    alert("Please log in to view your profile.");
                    navigate('/login');
                    return;
                }

                const res = await axios.get('http://localhost:9090/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFormData({
                    fullName: res.data.fullName || '',
                    userName: res.data.userName || '',
                    email: res.data.email || '',
                    bio: res.data.bio || '',
                    institute: res.data.institute || '',
                    rank: res.data.rank || '',
                    instituteRank: res.data.instituteRank || '',
                });

            } catch (err) {
                console.error('Error fetching user profile:', err);
                if (err.response && err.response.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    navigate('/login');
                }
            }
        };

        fetchCurrentUser();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                alert('You are not authenticated. Please log in.');
                navigate('/login');
                return;
            }
            
            const updatedData = {
                fullName: formData.fullName,
                userName: formData.userName,
                email: formData.email,
                bio: formData.bio,
                institute: formData.institute,
                rank: formData.rank,
                instituteRank: formData.instituteRank,
            };

            await axios.put('http://localhost:9090/me', updatedData, {
                headers: {
                    // The Content-Type is now 'application/json'
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            alert('Profile updated successfully!');
            navigate('/profile');
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="flex items-center text-gray-400 hover:text-white mb-6 cursor-pointer"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back
                        </button>
                        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                        <p className="text-gray-400">
                            Update your personal details.
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                    <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="userName" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                                    <input type="text" name="userName" id="userName" value={formData.userName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="institute" className="block text-sm font-medium text-gray-400 mb-1">Institute</label>
                                    <input type="text" name="institute" id="institute" value={formData.institute} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="rank" className="block text-sm font-medium text-gray-400 mb-1">Rank</label>
                                    <input type="text" name="rank" id="rank" value={formData.rank} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="instituteRank" className="block text-sm font-medium text-gray-400 mb-1">Institute Rank</label>
                                    <input type="text" name="instituteRank" id="instituteRank" value={formData.instituteRank} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                                <textarea name="bio" id="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="text-right">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage; 