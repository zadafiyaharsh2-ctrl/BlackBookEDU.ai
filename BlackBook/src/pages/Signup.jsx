
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../utils/api'; 
import { useCookies } from "react-cookie";
// import { useAuth } from '../utils/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [, setCookie] = useCookies(["token"]);


  const [step, setStep ] = useState(1);
  const [otp , setOtp ] = useState("");

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };  

  const handleRequestOtp = async(e) => {
    e.preventDefault();
    if(form.password !== confirmPassword ) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await api.post("/send-otp", { email: form.email });
      if(res.data.success){
        toast.success("Verification code sent to email");
        setStep(2);
        console.log("moved to step 2")
      }
    }catch(error){
      toast.error(error.response?.data?.message || "Failed to send OTP");

      console.log(error)
    }finally {
      setLoading(false);
    }
  };


  // const handleVerifyAndSignup = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const res = await api.post("/register", { ...form, otp });
  //     if (res.data && res.data.success) {
  //       // ... your existing cookie/token logic ...
  //       localStorage.setItem('accessToken', res.data.token);
  //       toast.success("Account verified and created!");
  //       setTimeout(() => navigate("/"), 2000);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Invalid OTP");
  //   } finally {
  //     setLoading(false);
  //   }

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validation
      if (!form.userName || !form.email || !form.password || !confirmPassword) {
        toast.error("Please fill all required fields", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        setLoading(false);
        return;
      }

      if (form.password !== confirmPassword) {

        // login(res.data.token);


        toast.error("Passwords do not match", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        setLoading(false);
        return;
      }

      // API call ko edit karlena
      const res = await api.post("/register", { ...form, otp });
      
      if (res.data && res.data.success) {
      
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);

          
    setCookie("token", res.data.token, {
          path: "/",
          expires: expirationDate,
          secure: window.location.protocol === 'https:',
          sameSite: 'strict'
        });

    // Also store in localStorage for Authorization header-based flows
    localStorage.setItem('accessToken', res.data.token);

        toast.success("Account verified and created successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        
        // Clear form
        // setForm({
        //   userName: "",
        //   email: "",
        //   phone: "",
        //   password: "",
        // });
        // setConfirmPassword("");

        
        
        // Redirect to login page
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } 
      
      // else {
      //   const errorMsg = res.data?.message || "Signup failed";
      //   toast.error(errorMsg, {
      //     position: "top-right",
      //     autoClose: 3000,
      //     theme: "colored",
      //   });
      // }
    } catch (error) {
      console.error("SignUp error:", error);
      // const errorMsg = error.response?.data?.message || 
      //                 error.message || 
      //                 "Signup failed";
      
      // toast.error(errorMsg, {
      //   position: "top-right",
      //   autoClose: 3000,
      //   theme: "colored",
      // });
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

        {/* Back Button */}

      
      <div className='absolute top-4 left-4'>
        <button
              type="button"
              onClick={() => navigate("/home")}
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
      <div className="w-1/2 hidden md:flex flex-col justify-center items-center bg-zinc-900 text-white p-8">
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

      {/* Right Panel (Sign Up Form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white p-8">
        <div className="max-w-md w-full">
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
         
          {/* <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            { step === 1? "Created Your Account" : "Verify Your Email" }
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="userName" className="sr-only">User Name</label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={form.userName}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="User Name"
                />
              </div>
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
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form> */}



          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            {step === 1 ? "Create Your Account" : "Verify Your Email"}
          </h2>

          {step === 1 ? (
            /* STEP 1 FORM */
            <form className="space-y-6" onSubmit={handleRequestOtp}>
              <div className="rounded-md shadow-sm space-y-4">
                <input name="userName" type="text" required value={form.userName} onChange={handleChange} placeholder="User Name" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email address" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="Phone Number" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                <input name="password" type="password" required value={form.password} onChange={handleChange} placeholder="Password" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                <input name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </form>
          ) : (
            /* STEP 2 FORM: OTP INPUT */
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">We've sent a 6-digit code to <span className="font-bold">{form.email}</span></p>
                <input 
                  type="text" 
                  maxLength="6"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  className="appearance-none rounded-md relative block w-full px-3 py-4 border-2 border-green-500 text-center text-2xl tracking-[1em] focus:outline-none focus:ring-green-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  {loading ? "Verifying..." : "Verify & Sign Up"}
                </button>
                <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-500 hover:underline">
                  Edit email / Go back
                </button>
              </div>
            </form>
          )}



          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
);

};

export default SignUp;