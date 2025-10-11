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
        <div className="min-h-screen bg-black text-white p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md-col-span-1">
                        {/* Left column content remains the same */}
                        <button onClick={() => navigate(-1)} /* ... */ >Back</button>
                        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                        <p className="text-gray-400">Update your personal details.</p>
                    </div>

                    <div className="md:col-span-2">
                         <div className="flex items-center space-x-6 mb-6">
                            {avatarPreview ? (
                                <img 
                                    src={avatarPreview} 
                                    alt="Profile Preview" 
                                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-700"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">Photo</span>
                                </div>
                            )}
                            <label htmlFor="profileImage" className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg">
                                Change Picture
                            </label>
                            <input 
                                type="file" 
                                id="profileImage" 
                                accept="image/*"
                                // 4. Point the file input to the correct handler
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2" />
                                </div>
                                <div>
                                    <label htmlFor="userName" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                                    <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                                <textarea name="bio" id="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"></textarea>
                            </div>

                            <div className="text-right">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
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