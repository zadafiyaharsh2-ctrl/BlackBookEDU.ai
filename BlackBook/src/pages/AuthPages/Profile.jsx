import React, { useState, useEffect } from 'react';
import Navbar from '../../components/AuthComponents/Navbar';
import HeatMap from '../../components/ProfileComponents/HeatMap';

const Profile = () => {
  // State to hold user data
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    institute: '',
    rank: '',
    instituteRank: '',
    imageUrl: '/me.jpg', // Default image
  });

  // State to toggle between view and edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // IMPORTANT: Replace with your actual API endpoint
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., show a notification to the user
      }
    };

    fetchUserData();
  }, []); // The empty dependency array ensures this runs only once on mount

  // Handle changes in the input fields during edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle saving the updated data
  const handleSave = async () => {
    try {
      // IMPORTANT: Replace with your actual API endpoint
      const response = await fetch('/api/user/profile', {
        method: 'PUT', // Or 'PATCH'
        headers: {
          'Content-Type': 'application/json',
          // If you use token-based auth, include the token here
          // 'Authorization': `Bearer ${your_auth_token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Exit edit mode on successful save
      setIsEditMode(false);
      // Optionally, you can re-fetch data here if the backend returns the updated object
      // const updatedData = await response.json();
      // setUserData(updatedData);

    } catch (error) {
      console.error("Error saving user data:", error);
       // Handle error, e.g., show a notification to the user
    }
  };

  return (
    <>
      <div className=''>
        <Navbar />
      </div>
      <div className='min-h-screen flex flex-col bg-zinc-900 text-white'>
        <div className='profile-page bg-blue-600 p-6 mt-4 mx-4 rounded-lg shadow-lg md:flex md:items-start'>
          <div className='user-image mb-4 max-w-1/6 mx-auto md:mx-0 md:mr-6 md:flex-1'>
            <img src={userData.imageUrl} alt='User' className='w-full h-auto rounded-xl' />
          </div>

          <div className='flex-1'>
            {isEditMode ? (
              // EDIT MODE VIEW
              <div className='user-info flex flex-col text-left bg-gray-700 p-4 rounded-lg'>
                <div className='mb-2'>
                  <label className='text-sm font-semibold'>Full Name</label>
                  <input type="text" name="fullName" value={userData.fullName} onChange={handleInputChange} className="w-full p-2 rounded text-black"/>
                </div>
                 <div className='mb-2'>
                  <label className='text-sm font-semibold'>Username</label>
                  <input type="text" name="username" value={userData.username} onChange={handleInputChange} className="w-full p-2 rounded text-black"/>
                </div>
                 <div className='mb-2'>
                  <label className='text-sm font-semibold'>Email</label>
                  <input type="email" name="email" value={userData.email} onChange={handleInputChange} className="w-full p-2 rounded text-black"/>
                </div>
                 <div className='mb-2'>
                  <label className='text-sm font-semibold'>Institute</label>
                  <input type="text" name="institute" value={userData.institute} onChange={handleInputChange} className="w-full p-2 rounded text-black"/>
                </div>
                 <div className='mb-2'>
                  <label className='text-sm font-semibold'>Rank</label>
                  <input type="text" name="rank" value={userData.rank} onChange={handleInputChange} className="w-full p-2 rounded text-black"/>
                </div>
                 <div className='mb-2'>
                  <label className='text-sm font-semibold'>Institute Rank</label>
                  <input type="text" name="instituteRank" value={userData.instituteRank} onChange={handleInputChange} className="w-full p-2 rounded text-black"/>
                </div>
                <div>
                  <button onClick={handleSave} className='mt-4 mr-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Save</button>
                  <button onClick={() => setIsEditMode(false)} className='mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600'>Cancel</button>
                </div>
              </div>
            ) : (
              // DISPLAY MODE VIEW
              <div>
                <div className='user-info flex flex-col text-center bg-red-400 p-4 rounded-lg md:text-left'>
                  <h2 className='text-xl font-semibold'>{userData.fullName || 'Full Name'}</h2>
                  <p className='text-sm text-gray-300 mb-2'>@{userData.username || 'username'}</p>
                  <h4 className='text-lg font-medium mt-4'>Email: <span className='font-normal'>{userData.email}</span></h4>
                  <h4 className='text-lg font-medium mt-4'>Institute: <span className='font-normal'>{userData.institute}</span></h4>
                  <h4 className='text-lg font-medium mt-4'>Rank: <span className='font-normal'>{userData.rank}</span></h4>
                  <h4 className='text-lg font-medium mt-4'>Institute Rank: <span className='font-normal'>{userData.instituteRank}</span></h4>
                </div>
                <button onClick={() => setIsEditMode(true)} className='mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600'>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <HeatMap />
      </div>
    </>
  );
};

export default Profile;