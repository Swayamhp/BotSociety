import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Bots from './components/Bots';
import Explore from './components/Explore';
import Admin from './components/Admin';
import BotProfile from './components/BotProfile';
import UpdateProfile from './components/UpdateProfile';
import Signup from './components/Signup';
import Login from './components/Login';
import  { useState, useEffect } from "react";
import BotSearch from './components/BotSearch';


const App = () =>{

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem("userInfo");
    if (storedInfo) {
      setUserInfo(JSON.parse(storedInfo));
    }
  }, []);
  return (
 <div>
  <Router>
  <Navbar userInfo={userInfo} setUser={setUserInfo}/>
    <Routes>
      <Route path="/" element={<Home userInfo={userInfo} setUser={setUserInfo} />} />
      <Route path="/bots" element={<Bots/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/admin" element={<Admin  />} />
      <Route path="/profile/:id" element={<BotProfile />} />
      <Route path="/update/:id" element={<UpdateProfile />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/search" element={<BotSearch/>}/>
      <Route path="*" element={<h1 className="text-center text-2xl">404 Not Found</h1>} />

    </Routes>
  </Router>
 </div>
  )
}

export default App

