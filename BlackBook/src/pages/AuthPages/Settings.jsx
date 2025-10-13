import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        bio: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null); // Renamed for clarity

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const res = await axios.get('http://localhost:9090/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setFormData({
                    fullName: res.data.fullName || '',
                    userName: res.data.userName || '',
                    email: res.data.email || '',
                    bio: res.data.bio || '',
                });
                if (res.data.avatarUrl) {
                    setAvatarPreview(res.data.avatarUrl);
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchCurrentUser();
    }, [navigate]);

    // 1. This handler is ONLY for text inputs.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. This is a NEW, separate handler for the file input.
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    // 3. This is the corrected handleSubmit using FormData
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }

            const submitData = new FormData();
            submitData.append('fullName', formData.fullName);
            submitData.append('userName', formData.userName);
            submitData.append('email', formData.email);
            submitData.append('bio', formData.bio);
            
            if (selectedFile) {
                submitData.append('avatar', selectedFile);
            }

            await axios.put('http://localhost:9090/me', submitData, {
                headers: {
                    // Axios will automatically set the correct 'multipart/form-data' header
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
        <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-8 font-sans">
            <div className="max-w-full mx-auto">


            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                <h1 className="text-xl font-bold tracking-wider">BlackBookEDU</h1>
            </div>

            <div className="flex items-center border-b border-gray-700 mt-4">
                <button 
                    onClick={() => navigate('/profile')}
                    className="py-3 px-5 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                    BACK TO PROFILE
                </button>
                <span className="py-3 px-5 text-sm text-white border-b-2 border-white font-semibold ">
                    SETTINGS
                </span>
            </div>

                <div className="mt-8 ">
                     {/* Image Upload Section */}
                <div className="bg-black rounded-lg p-6 flex items-center space-x-6 mb-8">
                    {avatarPreview ? (
                        <img 
                            src={avatarPreview} 
                            alt="Profile Preview" 
                            className="w-24 h-24 object-cover rounded-full border-2 border-gray-700"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                            <span className="text-gray-500">Photo</span>
                        </div>
                    )}
                    <div>
                        <label htmlFor="profileImage" className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
                            Change Picture
                        </label>
                        <input 
                            type="file" 
                            id="profileImage" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>

                </div>

                <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-300">Basic Info</h2>
                     
                     <div className="space-y-4">
                        {/* Full Name */}
                        <div className="grid grid-cols-3 items-center">
                            <label htmlFor="fullName" className="text-sm text-gray-400">Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="col-span-2 bg-transparent text-white border-none focus:ring-0" />
                        </div>
                        <hr className="border-gray-800" />

                        {/* Username */}
                        <div className="grid grid-cols-3 items-center">
                            <label htmlFor="userName" className="text-sm text-gray-400">Username</label>
                            <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="col-span-2 bg-transparent text-white border-none focus:ring-0" />
                        </div>
                        <hr className="border-gray-800" />
                        {/* Email */}
                        <div className="grid grid-cols-3 items-center">
                            <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="col-span-2 bg-transparent text-white border-none focus:ring-0" />
                        </div>
                        <hr className="border-gray-800" />
                        {/* Bio */}
                        <div className="grid grid-cols-3 items-start">
                            <label htmlFor="bio" className="text-sm text-gray-400 pt-2">Bio</label>
                            <textarea name="bio" id="bio" rows="3" value={formData.bio} onChange={handleChange} className="custom-scrollbar col-span-2 bg-transparent text-white border-none focus:ring-0 resize-none"></textarea>
                        </div>
                     </div>
                        <hr className="border-gray-800 my-6" />
                        <h2 className="text-lg font-semibold mb-4 text-gray-300">Security</h2>
                        {/* Password Change Placeholder */}
                        <div className="text-sm text-gray-400">
                            To change your password, please visit the <span className="text-blue-500 underline cursor-pointer" onClick={() => navigate('/change-password')}>Change Password</span> page.
                        </div>
                        <div className="mt-6 text-right">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default EditProfilePage;