import React, { useState } from 'react';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import axios from 'axios';
// import { set } from 'mongoose';

const Contact = () => {
  // Add 'subject' to your state object to store the selection
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry', // Default selected subject
    message: '',
  });

const [loading, setLoading] = useState(false);

const [responseMessage, setResponseMessage] = useState(''); // To show success/error messages
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');   // Clear previous messages

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:9090/contact',
        formData,
      


      );
      setResponseMessage({ type: 'success', message: 'Message sent successfully!' });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry', // Reset to default
        message: '',
      });
    }catch(error){

      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      setResponseMessage({ type: 'error', message: message });
      console.error('Submission Error:', error);

    }finally{
      setLoading(false); 
    }
  };

  //   console.log("Form data submitted:", formData);
  //   alert("Thank you for your message! We will get back to you soon.");
  //   // Reset the form, including the new subject field
  //   setFormData({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     phone: '',
  //     subject: 'General Inquiry', // Reset to default
  //     message: '',
  //   });
  // };
  
  // Array for subject options to keep the JSX clean
  const subjects = [
    { id: 'subject-general', value: 'General Inquiry', label: 'General Inquiry' },
    { id: 'subject-support', value: 'Technical Support', label: 'Technical Support' },
    { id: 'subject-billing', value: 'Billing Question', label: 'Billing Question' },
  ];

  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full bg-gray-5 text-gray-800 flex justify-center items-center py-12 px-4'>
        <div className='w-full max-w-4xl mx-auto'>
          <div className='text-center mb-10'>
            <h1 className='text-4xl md:text-5xl font-bold font-sans'>Contact Us</h1>
            <p className='text-gray-600 mt-4'>We would love to hear from you! Please fill out the form below.</p>
          </div>
          
          <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-lg space-y-6'>
            { responseMessage && (
              <div className={`p-4 mb-4 text-sm ${responseMessage.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
                {responseMessage.message}
              </div>
            )}


            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              
            
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                  required
                />
              </div>

              {/* Email and Phone Inputs remain the same */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              {/* --- INTEGRATED SUBJECT SELECTOR --- */}
              <div className='md:col-span-2'>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select a Subject</h3>
                <div className='flex flex-wrap gap-x-6 gap-y-2'>
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center">
                      <input
                        type="radio"
                        id={subject.id}
                        name="subject" 
                        value={subject.value}
                        checked={formData.subject === subject.value}
                        onChange={handleChange}
                        className="h-4 w-4 cursor-pointer border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={subject.id} className="ml-2 block text-sm text-gray-900 cursor-pointer">
                        {subject.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            
              {/* Message Textarea */}
              <div className='md:col-span-2'>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className='w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500'
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className='text-center'>
              <button
                type="submit"
                className='bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300'
                disabled={loading}  
              >
                {loading ? 'Sending...' :'Send Message'}
          
              </button>
            </div>
          </form>
        </div>

      </div>
        <div className=''>
          <div className='bg-black px-20 py-6 text-white'>
            <strong className='text-3xl'>Contact Information</strong>
          <p className='mt-2'>Feel free to reach out to us through any of the following methods:</p> 
          <div className='md:flex justify-around mt-10'>
          <ul className='space-y-8'>
            <li><strong>Email:</strong> your.email@example.com</li>
            <li><strong>Phone:</strong> (123) 456-7890</li>
            <li><strong>Address:</strong> 123 Main St, Anytown, USA</li>
          </ul>
        
            {/* <strong className='text-2xl'>Follow Us</strong> */}
            <ul className='mt-4 space-y-4'>
              <li><a href="#" className='hover:underline'>Facebook</a></li>
              <li><a href="#" className='hover:underline'>Twitter</a></li>
              <li><a href="#" className='hover:underline'>LinkedIn</a></li>
              <li><a href="#" className='hover:underline'>Instagram</a></li>
            </ul> 
    
          </div>
          <p className='mt-10 text-center '>We look forward to hearing from you!</p>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Contact;