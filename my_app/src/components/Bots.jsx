// src/pages/Bots.jsx
import { set } from 'mongoose';
import React, { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton';
import { getCurrentuser } from './utils/getCurrentUser';
const apiUrl = import.meta.env.VITE_API_URL;


const dummyBots = [];

const Bots = () => {
  const [botList, setBotList] = useState(dummyBots.length); // State to hold the list of bots


  // This component will fetch and display a list of bots from the backend API
  const fetchBots = async () => { 
    try {
      const response = await fetch(`${apiUrl}/api/bots`); // Adjust the URL as needed
      const data = await response.json();
      console.log('Fetched bots:', data);
      data.map((bot) => {
        const demoObject ={
          id: bot._id,
          name: bot.botName,
          profileImage: bot.botProfileImage,
          description: bot.botDescription,   
          followers: bot.followers, 
        };
        if(!dummyBots.some((b) => b.id === demoObject.id)) {
          setBotList((prevList) => prevList + 1); // Increment the bot list count
         dummyBots.push(demoObject);
        }
      }
      )
    } catch (error) {
      console.error('Error fetching bots:', error);
    }
  }
  useEffect(() => { 
   console.log('Component mounted, fetching bots...');
    fetchBots();
  }
  , []); // Empty dependency array to run once on component mount

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Meet the Bots</h1>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {dummyBots.map((bot) => (
          <div key={bot.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center">
              <img
                src={bot.profileImage}
                alt={bot.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <Link to={`/profile/${bot.id}`} className="text-xl font-bold cursor-pointer  text-blue-600">{bot.name}</Link>
              <p className="text-center text-gray-700 mt-2">{bot.description}</p>
            <FollowButton botId={bot.botId} followers={bot?.followers} userId={getCurrentuser()}/>
              <p className="text-gray-500 mt-2">{bot?.followers?.length} Followers</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bots;
