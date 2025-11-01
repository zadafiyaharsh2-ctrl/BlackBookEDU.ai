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
        <h1 className='min-h-screen bg-gray-900'>Problems</h1>
    </div></div>
  )
}

export default Problems