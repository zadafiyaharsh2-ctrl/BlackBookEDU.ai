import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../utils/api';
import { useCookies } from 'react-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [cookie , setCookie] = useCookies(["token"]);
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

          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);

          
        setCookie("token", res.data.token, {
                    path: "/",
                    expires: expirationDate,
                    secure: true,
                    sameSite: 'strict'
                });

        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        // Redirect to home page
        setTimeout(() => {
          navigate("/");
        }, 1500);
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
    <button
              type="button"
              onClick={() => navigate("/")}
              className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
            >
              Home
            </button>


    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
        </div>
        
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
    </>
  );
};

export default Login;