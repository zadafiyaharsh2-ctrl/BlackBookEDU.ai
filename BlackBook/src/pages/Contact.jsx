import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Contact = () => {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [messages, setMessages] = useState([]);

  const { subject, message } = form;

  // ✅ Fetch user messages
  const fetchMessages = async () => {
    try {
      const { data } = await api.get("/contact");
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact", { subject, message });
      alert("Message sent successfully!");
      setForm({ subject: "", message: "" });
      await fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>

        {/* ✅ Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Your message"
            required
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </form>

        {/* ✅ Messages Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Messages
          </h2>
          {messages.length > 0 ? (
            <ul className="space-y-3">
              {messages.map((m) => (
                <li
                  key={m._id || m.id}
                  className="p-4 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition"
                >
                  <strong className="text-blue-600">{m.subject}</strong>
                  <p className="text-gray-700 mt-1">{m.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
