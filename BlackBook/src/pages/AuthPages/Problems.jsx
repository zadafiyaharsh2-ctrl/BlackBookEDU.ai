import React, {useEffect, useState } from 'react'
import Navbar from '../../components/AuthComponents/Navbar';
import axios from 'axios';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchProblems = async() => {
      try{
        const token = localStorage.getItem('accessToken');
        if(!token){
          console.error('No token found, redirecting to login.');
          return;
        }
        const res = await axios.get('http://localhost:9090/problems', {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched problems:', res.data);
        setProblems(res.data.problems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    }
    fetchProblems();
  }, []);

  const handleAnswerSubmission = async (problemId, selectedOption) => {
        // Prevent re-submission if already checked
        if (results[problemId]?.isChecked) return;

        const token = localStorage.getItem('accessToken');
        if (!token) return console.error('No token found.');

        try {
            const res = await axios.post(`http://localhost:9090/problems/check`, {
                problemId: problemId,
                userAnswer: selectedOption,
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const { isCorrect, correctAnswer } = res.data;
            setResults(prev => ({
                ...prev,
                [problemId]: {
                    isCorrect,
                    correctAnswer,
                    selectedOption,
                    isChecked: true,
                }
            }));
            } catch (error) {
            console.error('Error checking answer:', error);
        }
    };


  return (

    <div>
      <div className="min-h-screen bg-black text-white font-sans">
        <Navbar />
        <div className='bg-gray-900 p-8'>
          <h1 className='text-3xl font-bold mb-6 text-white'>Problem List</h1>
          {problems.length > 0 ? (
            <ul className='space-y-4'>
                            {problems.map((problem) => {
                                const problemResult = results[problem._id] || {};
                                const { isChecked, isCorrect, correctAnswer, selectedOption } = problemResult;

                                return (
                                    <li
                                        key={problem._id}
                                        className='p-4 border border-gray-700 rounded-lg bg-gray-800'
                                    >
                                        <p className='text-lg font-medium mb-4'>{problem.question}</p>

                                        <div className='flex flex-wrap gap-2 mb-4'>
                                            {problem.options.map((option, index) => (
                                                <button
                                                    key={index} // Safe key here since options array is static
                                                    onClick={() => handleAnswerSubmission(problem._id, option)}
                                                    disabled={isChecked}
                                                    className={`
                                                        px-4 py-2 rounded-full text-sm font-semibold transition-colors
                                                        ${isChecked ? 
                                                            (option === selectedOption && isCorrect ? 'bg-green-600' : 
                                                             option === selectedOption && !isCorrect ? 'bg-red-600' :
                                                             option === correctAnswer ? 'bg-green-600' : 'bg-gray-700 cursor-not-allowed')
                                                            : 'bg-blue-600 hover:bg-blue-700'
                                                        }
                                                    `}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>

                                        {isChecked && (
                                            <div>
                                                <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                                    {isCorrect ? 'Status: Correct! ✅' : 'Status: Incorrect. ❌'}
                                                </p>
                                                {!isCorrect && (
                                                    <p className='text-yellow-400'>
                                                        Final Answer: {correctAnswer}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className='text-gray-400'>No problems to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
  }
export default Problems