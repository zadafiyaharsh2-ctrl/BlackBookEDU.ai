import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import api from '../utils/api';

function getCookie(name) {
  const m = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ subject: 'General Inquiry', message: '' });
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);

  const isAuthed = useMemo(
    () => Boolean(localStorage.getItem('accessToken') || getCookie('token')),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResp(null);

    if (!isAuthed) {
      setResp({ type: 'error', message: 'Please log in to send a message.' });
      setTimeout(() => navigate('/login'), 800);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        subject: (form.subject || '').trim(),
        message: (form.message || '').trim(),
      };
      const { data } = await api.post('/users/contact/submit', payload);
      setResp({ type: 'success', message: data?.message || 'Message sent!' });
      setForm({ subject: 'General Inquiry', message: '' });
    } catch (error) {
      const msg = error.response?.data?.message || 'An error occurred. Please try again.';
      setResp({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    { id: 'subject-general', value: 'General Inquiry', label: 'General Inquiry' },
    { id: 'subject-support', value: 'Technical Support', label: 'Technical Support' },
    { id: 'subject-billing', value: 'Billing Question', label: 'Billing Question' },
    { id: 'subject-other', value: 'Other', label: 'Other' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gray-5 text-gray-800 flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-sans">Contact Us</h1>
            <p className="text-gray-600 mt-4">Logged-in users only. Your account info is attached automatically.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            {resp && (
              <div className={`p-4 mb-4 text-sm ${resp.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
                {resp.message}
              </div>
            )}

            {!isAuthed && (
              <div className="p-3 text-sm text-yellow-800 bg-yellow-100 rounded">
                You must be logged in to submit the form.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select a Subject</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {subjects.map((s) => (
                    <label key={s.id} htmlFor={s.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        id={s.id}
                        name="subject"
                        value={s.value}
                        checked={form.subject === s.value}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Describe your issue or request..."
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-60" disabled={loading || !isAuthed}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;