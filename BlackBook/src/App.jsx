import React from 'react'
import { BrowserRouter as Router ,  Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/AuthPages/Profile';
// import Contact from './pages/Contact';
import Dashboard from './pages/AuthPages/Dashboard';
import AI from './pages/AuthPages/AI';
import Analytics from './pages/AuthPages/Analytics';
import Problems from './pages/AuthPages/Problems';
import Settings from './pages/AuthPages/Settings';
import Playground from './pages/AuthPages/Playground';
import Social from './pages/AuthPages/Social';
import { useCookies } from 'react-cookie';



const App = () => {
  const [cookie , ] = useCookies(["token"]);

  return (
    <div>
      <Router>
        {cookie.token ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path='/Contact' element={<Contact />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/AI' element={<AI />} />
                <Route path='/Analytics' element={<Analytics />} />
                <Route path='/Problems' element={<Problems />} />
                <Route path='/Settings' element={<Settings />} />
                <Route path='/Playground' element={<Playground />} />
                <Route path='/Social' element={<Social />} />
                <Route path="*" element={<Home />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            )}
      </Router>
    </div>
  )
}

export default App