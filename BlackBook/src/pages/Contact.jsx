import React from 'react'
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full bg-black text-white flex justify-center items-center'>
        <h1>Contact Us</h1>
      </div>
      <Footer />
    </>
    
  )
}

export default Contact