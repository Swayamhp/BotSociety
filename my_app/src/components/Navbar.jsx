import React, { useState, useEffect, } from "react";
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
// import Admin from "./Admin"; // Importing the Admin component
// import Cookies from "js-cookie"; // Importing js-cookie for cookie management
// import { jwtDecode } from "jwt-decode";
// Importing jwt-decode for decoding JWT tokens

const Navbar = ({userInfo,setUser}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to toggle mobile menu
  // const [userInfo, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [logout,setLogout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    // const userCookie = Cookies.get('jwt');
    // console.log(userCookie);
    // if (userCookie) {
    //   const userData = JSON.parse(userCookie);
    //   console.log(userData);
    //   setUser(userData);
    // }
    //if local storage have userInfo then set user to userInfo
   
  }, []);
  // Toggle mobile menu on click
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
  localStorage.clear();
  setLogout(true);
  setUser(null);

  };
  const handleSearchSubmit = (e)=>{
    e.preventDefault();
  console.log("hello");
    const trimmedQuery = searchTerm.trim();
    console.log(trimmedQuery)
    if (trimmedQuery) {
      // Set search query in the URL as `?query=...`
      console.log(trimmedQuery);
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }  }

  return (
    <div>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/"><h1 className="text-2xl font-bold text-blue-600">BotSociety</h1></Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Input */}

          <div className="relative">
            <form onSubmit={(e)=>{
              handleSearchSubmit(e);
            }}>
            <input
              type="text"
              placeholder="Search bots..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
            </form>
          </div>

          {/* Navigation Links */}
          <ul className="flex gap-6 text-gray-700 font-medium text-base">
            <li>
              <Link
                to="/admin"
                className="border-2 rounded-2xl border-blue-500 p-1 hover:bg-blue-500 transition *:druation-200 hover:text-white"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/bots"
                className="hover:text-blue-600 transition duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1"
              >
                Bots
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="hover:text-blue-600 transition duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1"
              >
                Explore
              </Link>
            </li>
            {/* profile picture */}
            {userInfo ? (
              <li className="relative flex items-center gap-2 group">
                {" "}
                {/* Added group class here */}
                {/* Profile Icon */}
                <span className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500">
                  <span className="text-blue-700 text-2xl px-1.5 mb-2 cursor-pointer">
                    {userInfo?.user?.userName[0].toUpperCase()}
                  </span>
                </span>
                {/* Profile Hover Details */}
                <div className="absolute right-5 top-3 mt-3 p-4 w-80 h-30 bg-white shadow-lg rounded-md hidden group-hover:block">
                  <p className="text-blue-700 mb-3 text-lg">
                    {userInfo.user.userName}

                  </p>
                  <p className="text-blue-700 mb-3 text-lg">
                    {userInfo.user.userEmail}
                    
                  </p>
                  <button
                    onClick={handleLogout} // Add your logout function here
                    className="w-full text-left px-4 py-3  text-sm text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:text-white bg-blue-600 px-4 py-1 rounded-full transition duration-200 hover:bg-blue-700 text-white"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          {userInfo && (
            <li className="relative flex items-center gap-2">
              {/* Profile Icon */}
              <span
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500 flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown} // Now click toggles dropdown
              >
                <span className="text-blue-700 text-2xl">
                  {userInfo.user.userName[0].toUpperCase()}
                </span>
              </span>

              {/* Profile Hover/Click Details */}
              {showDropdown && (
                <div className="absolute right-0 top-10 mt-2 p-4 w-48 bg-white shadow-lg rounded-md">
                  <p className="text-blue-700 mb-3 text-lg">
                    {userInfo.user.userName}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
          <button
            onClick={handleMobileMenuToggle}
            className="text-gray-600 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Responsive */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          {/* Search Input (Mobile version) */}
          <div className="relative mb-4">
            <form >
            <input
            onSubmit={(e)=>{
              handleSearchSubmit(e);
              navigate('')
            }}
              type="text"
              placeholder="Search bots..."
              className="pl-10 pr-4 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            </form>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-4 text-gray-700 font-medium text-base">
            <li>
              <Link
                to="/admin"
                className="border-2 rounded-2xl border-blue-500 p-1 hover:bg-blue-500 transition *:druation-200 hover:text-white"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/bots"
                className="hover:text-blue-600 transition duration-200"
              >
                Bots
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="hover:text-blue-600 transition duration-200"
              >
                Explore
              </Link>
            </li>
            {!userInfo && (
              <li>
                <Link
                  to="/login"
                  className="hover:text-white bg-blue-600 px-4 py-1 rounded-full transition duration-200 hover:bg-blue-700 text-white"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
