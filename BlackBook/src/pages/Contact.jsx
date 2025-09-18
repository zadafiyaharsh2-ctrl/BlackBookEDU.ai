import React from 'react'
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full bg-white text-black flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center space-y-4'>
        <h1 className='text-4xl font-bold'>Contact Us</h1>
        <p className='text-center'>We would love to hear from you! Please fill out the form below.</p>
        <div className='flex justify-center top-4 left-4'>
          <form
            action=""
            className='flex flex-col justify-center items-center'
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submitted!");
            }}
          >
            <input type="text" name="Firstname" placeholder="Your First Name" className='border p-2 m-2' />
            <input type="text" name="Lastname" placeholder="Your Last Name" className='border p-2 m-2' />
            <input type="email" name="email" placeholder="Your Email" className='border p-2 m-2' />
            <input type="phone" name="phone" placeholder="Your Phone Number" className='border p-2 m-2' />
            <textarea name="message" placeholder="Your Message" className='resize-none border p-2 m-2' ></textarea>
            <button type="submit" className='bg-blue-500 text-white p-2 m-2'>Send</button>
          </form>
            </div>

        </div>
      </div>
      <Footer />
    </>
    
  )
}

export default Contact