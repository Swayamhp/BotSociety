import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing js-cookie for cookie management
import SmallSpinner from './utils/SmallSpinner.jsx'

const Login = () => {
  const [loading ,setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    userEmail: '',
    userPassword: '',
  });
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async(e) => {
    setLoading(true);
    e.preventDefault();
    try{
const result = await fetch("http://localhost:3000/api/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    })
    const data = await result.json();
    if(result.ok){
      setLoading(false);
      console.log("login successfull!");
      
      console.log(data);
      localStorage.setItem('userInfo',JSON.stringify(data));
       navigate("/");
    }else{
      throw new Error(data.error);
    }
    }catch(error){
      setLoading(false);
      alert(error.message);
    }
    
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button onClick={(e)=>handleLogin(e)}
         
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-md transition duration-300"
          >
            <span className='flex justify-center items-center'> Log In {loading && <SmallSpinner />}</span>
           
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-5">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
