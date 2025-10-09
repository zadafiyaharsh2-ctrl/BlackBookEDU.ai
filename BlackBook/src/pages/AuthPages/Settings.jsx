import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        bio: '',
        institute: '',
        rank: '',
        instituteRank: '',
        imageUrl: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get('http://localhost:9090/api/user/profile');
                setFormData({
                    fullname: res.data.fullname || '',
                    username: res.data.username || '',
                    email: res.data.email || '',
                    bio: res.data.bio || '',
                    institute: res.data.institute || '',
                    rank: res.data.rank || '',
                    instituteRank: res.data.instituteRank || '',
                    imageUrl: res.data.imageUrl || ''
                });
                // Set image preview if user has an existing image
                if (res.data.imageUrl) {
                    setImagePreview(res.data.imageUrl); // imageUrl is now Base64 data URL
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
            }
        };
        fetchCurrentUser();
    }, []);

    // Cleanup effect to revoke object URLs
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Revoke previous object URL to prevent memory leaks
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('fullname', formData.fullname);
            submitData.append('username', formData.username);
            submitData.append('email', formData.email);
            submitData.append('bio', formData.bio);
            submitData.append('institute', formData.institute);
            submitData.append('rank', formData.rank);
            submitData.append('instituteRank', formData.instituteRank);
            
            // If a file is selected, append it
            if (selectedFile) {
                submitData.append('profileImage', selectedFile);
            }

            await axios.put('http://localhost:9090/api/user/profile', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                    {/* Left Column: Title and Description */}
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
                            Update your personal details and profile picture.
                        </p>
                    </div>

                    {/* Right Column: Form */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Picture */}
                            <div className="flex items-center space-x-6">
                                {imagePreview ? (
                                    <img 
                                        src={imagePreview} 
                                        alt="Profile Preview" 
                                        className="w-24 h-24 object-cover rounded-full border-2 border-gray-700"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                                        <span className="text-gray-500">Photo</span>
                                    </div>
                                )}
                                <label htmlFor="profileImage" className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg">
                                    Change Picture
                                </label>
                                <input 
                                    type="file" 
                                    name="profileImage" 
                                    id="profileImage" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                    <input type="text" name="fullname" id="fullname" value={formData.fullname} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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