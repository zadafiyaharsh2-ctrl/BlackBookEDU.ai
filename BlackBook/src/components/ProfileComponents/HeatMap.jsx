import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import api from '../../utils/api';
import CalendarHeatmap from 'react-calendar-heatmap';
import { useAuth } from '../../utils/AuthContext';

function DashboardPage() {
    const { logout } = useAuth();
    const [answers, setAnswers] = useState({});
    const [heatmapData, setHeatmapData] = useState([]);
    const [message, setMessage] = useState('');

  // Quiz Questions
  const questions = [
    { id: 'q1', text: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin', 'Madrid'] },
    { id: 'q2', text: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'] },
    { id: 'q3', text: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'] }
  ];

  const fetchHeatmapData = async () => {
    try {
      
      const response = await api.get('/data');
      setHeatmapData(response.data);
    } catch (error) {
      console.error("Error fetching heatmap data", error);
    }
  };

  useEffect(() => {
    fetchHeatmapData();
  }, []);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      setMessage('Please answer all questions!');
      return;
    }
    try {
      const response = await api.post('/submit', answers);
      setMessage(response.data.message);
      fetchHeatmapData(); 
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error("Error submitting answers", error);
    }
  };

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return (
    <div className="bg-slate-900 min-h-screen text-white p-4 sm:p-8">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
          Logout
        </button>
      </header>
      <main className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Quiz Card */}
        <div className="bg-slate-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Daily Quiz 🧠</h2>
          <form onSubmit={handleSubmit}>
            {questions.map(q => (
              <div key={q.id} className="mb-5">
                <p className="font-medium mb-3">{q.text}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map(option => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name={q.id} value={option} onChange={() => handleOptionChange(q.id, option)} checked={answers[q.id] === option} className="w-4 h-4 text-blue-600" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Submit Answers
            </button>
          </form>
          {message && <p className="mt-4 font-semibold text-green-600">{message}</p>}
        </div>
        {/* Heatmap Card */}
        <div className="bg-slate-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Your Activity</h2>
          <CalendarHeatmap
            startDate={oneYearAgo}
            endDate={today}
            values={heatmapData}
            classForValue={(value) => {
              if (!value || value.count === 0) return 'color-empty';
              if (value.count >= 4) return 'color-scale-4';
              if (value.count >= 3) return 'color-scale-3';
              if (value.count >= 2) return 'color-scale-2';
              return 'color-scale-1';
            }}
            tooltipDataAttrs={value => ({
              'data-tip': `${value.date} has count: ${value.count || 0}`,
            })}
          />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;