import React from 'react'
// import Navbar from '../components/DashboardComponents/Navbar';
// import Footer from '../components/Common/Footer';
import HeatMap from '../components/ProfileComponents/HeatMap';

const profile = () =>{
  return (
    <>
    <div className='min-h-screen flex flex-col bg-zinc-900 text-white'>
       <div className='profile-page bg-blue-600 p-6 mt-4 mx-4 rounded-lg shadow-lg md:flex flex-col justify-between md:flex-row items-center md:items-start'>
        <div className='user-image mb-4 max-w-1/6 mx-auto md:mx-0 md:mr-6 md:flex-1'>

      <img src='/me.jpg' alt='User-image' className='w-full h-auto rounded-xl ' />  {/* add image form backend */}
        </div>


        <div className='user-info flex flex-col text-center bg-red-400 p-4 rounded-lg md:text-left md:flex-1'>   
          <h2 className='text-xl font-semibold'>Full Name</h2>
          <p className='text-sm text-gray-300 mb-2'>@username</p>
          <h4 className='text-lg font-medium mt-4'>Email:</h4 >
          <h4 className='text-lg font-medium mt-4'>Institute:</h4>
          <h4 className='text-lg font-medium mt-4'>Rank:</h4>
          <h4 className='text-lg font-medium mt-4'>Institute Rank:</h4>
        </div>

       </div>

        < HeatMap />




    </div>


    
    
    </>
  )
}

export default profile;