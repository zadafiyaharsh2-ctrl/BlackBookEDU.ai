import React, {useEffect, useState } from 'react'
import Navbar from '../../components/AuthComponents/Navbar';
import axios from 'axios';

const Problems = () => {
  const [problems, setProblems] = useState([]);

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
  return (

    <div>
      <div className="min-h-screen bg-black text-white font-sans">
        <Navbar />
        <div className='bg-gray-900 p-8'>
          <h1 className='text-3xl font-bold mb-6 text-white'>Problem List</h1>
          {problems.length > 0 ? (
            <ul className='space-y-4'>
              {problems.map((problem) => (
                <li
                key={problem._id}
                className='p-4 border border-gray-700 rounded-lg bg-gray-800'>

                <p className='text-lg font-medium'>

                {problem.question}
                <br />
                </p>
                <p>Options: {problem.options.join(", ")}</p>
                <p>Answer: {problem.answer}</p>
                </li>
                ))}
                </ul>
                ) : (
                  <p className='text-gray-400'>No problems to display.</p>
                  )}
                  
        </div>
    </div></div>
  )
}

export default Problems