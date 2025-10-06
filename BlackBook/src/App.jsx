import React from 'react'
import { BrowserRouter as Router ,  Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import { useCookies } from 'react-cookie';


const App = () => {
  const [cookie , setCookie] = useCookies(["token"]);

  return (
    <div>
      <Router>
        {cookie.token ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/home" element={<Home />} />
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