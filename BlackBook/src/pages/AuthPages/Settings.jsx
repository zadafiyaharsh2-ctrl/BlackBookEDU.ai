import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // New dependency for a clean icon

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        phone: '',
        location: '',
        birthdate: '',
        bio: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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

                const formattedDate = res.data.birthdate 
                    ? new Date(res.data.birthdate).toISOString().split('T')[0] 
                    : '';

                setFormData({
                    fullName: res.data.fullName || '',
                    userName: res.data.userName || '',
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    location: res.data.location || '',
                    birthdate: formattedDate, // Use the formatted date
                    bio: res.data.bio || '',
                });

                if (res.data.avatarUrl) {
                    setAvatarPreview(res.data.avatarUrl);
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                } else {
                    setError('Could not load profile data.');
                }
            }
        };
        fetchCurrentUser();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset states
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }

            const submitData = new FormData();
            // Append all form data
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });
            
            if (selectedFile) {
                submitData.append('avatar', selectedFile);
            }

            await axios.put('http://localhost:9090/me', submitData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            setIsLoading(false);
            setSuccess('Profile updated successfully!');
            
            setTimeout(() => {
                navigate('/profile');
            }, 1500);

        } catch (err) {
            console.error('Error updating profile:', err);
            setIsLoading(false);
            setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
        }
    };

    const FormInput = ({ id, label, type = 'text', ...props }) => (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                className="block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-8 font-sans">
            <div className="max-w-3xl mx-auto">

                <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                    <h1 className="text-xl font-bold tracking-wider">BlackBookEDU</h1>
                </div>

                <div className="flex items-center border-b border-gray-700 mt-4">
                    <button 
                        onClick={() => navigate('/profile')}
                        className="flex items-center py-3 px-4 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        <IoArrowBack className="mr-2" />
                        BACK TO PROFILE
                    </button>
                    <span className="py-3 px-5 text-sm text-white border-b-2 border-white font-semibold">
                        SETTINGS
                    </span>
                </div>


                <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                    <div className="bg-[#1a1a1a] rounded-lg p-6 flex flex-col sm:flex-row items-center sm:space-x-6">
                        {avatarPreview ? (
                            <img 
                                src={avatarPreview} 
                                alt="Profile Preview" 
                                className="w-24 h-24 object-cover rounded-full border-2 border-gray-700"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-gray-500">
                                Photo
                            </div>
                        )}
                        <div className="mt-4 sm:mt-0">
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
                            <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-lg p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-6 text-gray-200">Basic Info</h2>
                        
                        <div className="space-y-6">
                            {/* Grouped Fields: Name & Username */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    id="fullName"
                                    label="Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                />
                                <FormInput
                                    id="userName"
                                    label="Username"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    placeholder="Your username"
                                />
                            </div>

                            {/* Grouped Fields: Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    id="email"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                />
                                <FormInput
                                    id="phone"
                                    label="Phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            {/* Grouped Fields: Location & Birthdate */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    id="location"
                                    label="Location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City, Country"
                                />
                                <FormInput
                                    id="birthdate"
                                    label="Birthdate"
                                    type="date" // Better UX
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Full-width Field: Bio */}
                            <div>
                                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-300">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows="4"
                                    className="custom-scrollbar block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    placeholder="Tell us a little about yourself..."
                                    value={formData.bio}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                        <hr className="border-gray-700 my-8" />

                        {/* --- Security Section --- */}
                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Security</h2>
                        <div className="text-sm text-gray-400 bg-gray-800 p-4 rounded-lg">
                            To change your password, please visit the{' '}
                            <span 
                                className="text-blue-400 underline cursor-pointer hover:text-blue-300" 
                                onClick={() => navigate('/change-password')}
                            >
                                Change Password
                            </span>
                            {' '}page.
                        </div>

                        {/* --- Submit & Messages --- */}
                        <div className="mt-8">
                            {/* Success Message */}
                            {success && (
                                <div className="mb-4 text-center text-green-400 bg-green-900/30 p-3 rounded-lg">
                                    {success}
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default EditProfilePage;