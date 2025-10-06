import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import api from '../utils/api';

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  // Optional: gate access if not logged in
  const token = localStorage.getItem('accessToken');
  const isAuthed = Boolean(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null);

    if (!isAuthed) {
      setResponseMessage({ type: 'error', message: 'Please log in to send a message.' });
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    setLoading(true);
    try {
      // Backend attaches userId from JWT; we only send fields
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const { data } = await api.post('/contact/submit', payload);
      setResponseMessage({
        type: 'success',
        message: data?.message || "Your message has been received. We'll get back to you shortly.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (error) {
      if (error.response?.status === 401) {
        setResponseMessage({ type: 'error', message: 'Session expired. Please log in again.' });
        localStorage.removeItem('accessToken');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        const msg = error.response?.data?.message || 'An error occurred. Please try again.';
        setResponseMessage({ type: 'error', message: msg });
      }
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    { id: 'subject-general', value: 'General Inquiry', label: 'General Inquiry' },
    { id: 'subject-support', value: 'Technical Support', label: 'Technical Support' },
    { id: 'subject-billing', value: 'Billing Question', label: 'Billing Question' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gray-5 text-gray-800 flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-sans">Contact Us</h1>
            <p className="text-gray-600 mt-4">We would love to hear from you! Please fill out the form below.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            {responseMessage && (
              <div
                className={`p-4 mb-4 text-sm ${
                  responseMessage.type === 'success'
                    ? 'text-green-700 bg-green-100'
                    : 'text-red-700 bg-red-100'
                } rounded-lg`}
                role="alert"
              >
                {responseMessage.message}
              </div>
            )}

            {!isAuthed && (
              <div className="p-3 text-sm text-yellow-800 bg-yellow-100 rounded">
                You must be logged in to submit the form.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select a Subject</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
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

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-60"
                disabled={loading || !isAuthed}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="bg-black px-20 py-6 text-white">
          <strong className="text-3xl">Contact Information</strong>
          <p className="mt-2">Feel free to reach out to us through any of the following methods:</p>
          <div className="md:flex justify-around mt-10">
            <ul className="space-y-8">
              <li>
                <strong>Email:</strong> your.email@example.com
              </li>
              <li>
                <strong>Phone:</strong> (123) 456-7890
              </li>
              <li>
                <strong>Address:</strong> 123 Main St, Anytown, USA
              </li>
            </ul>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <p className="mt-10 text-center ">We look forward to hearing from you!</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;