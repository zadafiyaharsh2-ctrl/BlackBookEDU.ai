import React from 'react'
import Navbar from '../../components/AuthComponents/Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
    <div className='top-header '>
      <div className='grid grid-cols-3 gap-4 p-4 m-4 border rounded-lg shadow-md'>
      <div className='bg-blue-600'>Name of Student</div>
      <div className='bg-green-500'>Name of Student</div>
      <div className='bg-red-500'>Name of Student</div>
    </div>
    <div className='grid grid-cols-2 gap-4 p-4 m-4 border rounded-lg shadow-md'>
      <div className='bg-orange-300'>School Ranking Change</div>
      <div className='bg-yellow-200'>Your Next Competitor</div>
      </div>
    </div>

    <div className='select-section grid grid-cols-3 gap-4 p-4 m-4 border rounded-lg shadow-md'>
      <div className='bg-purple-300'>Select Option 1</div>
      <div className='bg-pink-200'>Select Option 2</div>
      <div className='bg-indigo-400'>Select Option 3</div>
    </div>

    <div className='stats'>
      


    </div>



    </>
)
}

export default Dashboard