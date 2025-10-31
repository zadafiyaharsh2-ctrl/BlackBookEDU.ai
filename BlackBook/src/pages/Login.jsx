import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../utils/api';
import { useCookies } from 'react-cookie';
// import { useAuth } from '../utils/AuthContext';


const Login = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [, setCookie] = useCookies(["token"]);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validation
      if (!form.email || !form.password) {
        toast.error("Please fill all required fields", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        setLoading(false);
        return;
      }

      // API call
      const res = await api.post("/login", form);
                
      if (res.data && res.data.success) {

        // login(res.data.token);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      setCookie("token", res.data.token, {
        path: "/", // <--- make cookie available everywhere
        expires: expirationDate, // persists for 30 days
        secure: window.location.protocol === 'https:', // secure only for https
        sameSite: 'lax', // prevents accidental clearing due to strict rules
      });

      // optional: keep in localStorage as backup
      localStorage.setItem("accessToken", res.data.token);


        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        // Redirect to dashboard page
        setTimeout(() => {
          navigate("/dashboard");
        }, 0);
      } else {
        const errorMsg = res.data?.message || "Login failed";
        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error.response?.data?.message || 
                       error.message || 
                       "Login failed";
      
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex">


    {/* Back Button */}
      <div className='absolute top-4 left-4'>
        <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 font-medium px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md cursor-pointer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              <span>Back to Home</span>
            </button>
      </div>


     {/* Left Panel (Hidden on mobile) */}
      <div className="w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8">
        
        <div className="mb-8 flex flex-col items-center">
          <img src="logo.svg" alt="BlackBookEdu" className="h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">BlackBookEdu</h2>
        </div>
        {/* <img src="/path-to-illustration.svg" alt="Illustration" className="w-3/4 mb-8" /> */}
        <div className="text-center">
          <h3 className="text-xl font-bold">Online Community For Students & Teachers</h3>
          <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
        </div>
      </div>
      
    

{/* Right Panel (Login Form) */}
 
    <div className="flex w-full md:w-1/2 justify-center items-center p-8">
      


      <div className='max-w-md w-full'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

     

      
      
      
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
    
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
    </div>
  
    </>
  );
};

export default Login;