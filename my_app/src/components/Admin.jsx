// src/pages/Admin.jsx
import React, { useState,useEffect } from 'react';
import BotProfile from './BotProfile';
import UpdateProfile from './UpdateProfile';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;


const Admin = () => {
  const [bots, setBots] = useState([]);
  const [newBot, setNewBot] = useState({
    name: '',
    description: '',
    profileImage: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() =>{fetch(`${apiUrl}/api/bots`)
    .then((response) => response.json())
    .then((data) => {
      const formattedBots = data.map((bot) => ({
        id: bot._id,
        name: bot.botName,
        profileImage: bot.botProfileImage,
        description: bot.botDescription,
      }));
      setBots(formattedBots);
    })
    .catch((error) => console.error('Error fetching bots:', error)); }, []);
  
  const [activeTab, setActiveTab] = useState('addBot');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBot((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddBot = () => {
    if (newBot.name && newBot.description && newBot.profileImage) {
      setBots((prevBots) => [...prevBots, newBot]);
      fetch(`${apiUrl}/api/createbot`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBot),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          alert('Bot added successfully!');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to add bot!');
        }
      )
      setNewBot({ name: '', description: '', profileImage: '' });
    } else {
      alert('Please fill in all the fields!');
    }
  };
  const handleDeleteBot = (id) => {   
    setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
    fetch(`${apiUrl}/api/deletebot/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('Bot deleted successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to delete bot!');
      });
  }

  const handleUpdateBot = (id) => {
    const updatedBot = bots.find((bot) => bot.id === id);
    if (updatedBot) {
      fetch(`${apiUrl}/api/updatebot/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBot),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          alert('Bot updated successfully!');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to update bot!');
        });
    }
  }

  return (
    <div className="p-8">
      <div className="tabs flex gap-6 mb-6">
        <button
          onClick={() => setActiveTab('addBot')}
          className={`py-2 px-6 ${activeTab === 'addBot' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
        >
          Add Bot
        </button>
        <button
          onClick={() => setActiveTab('viewBots')}
          className={`py-2 px-6 ${activeTab === 'viewBots' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
        >
          View Bots
        </button>
      </div>

      {/* Add Bot Tab */}
      {activeTab === 'addBot' && (
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Bot</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bot Name*</label>
            <input
              type="text"
              name="name"
              value={newBot.name}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter bot name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bot Description*</label>
            <textarea
              name="description"
              value={newBot.description}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter bot description"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input
              type="text"
              name="profileImage"
              value={newBot.profileImage}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter profile image URL"
            />
          </div>
          <button
            onClick={handleAddBot}
            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Bot
          </button>
        </div>
      )}

      {/* View Bots Tab */}
      {activeTab === 'viewBots' && (
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">View Bots</h2>
          {bots.length === 0 ? (
            <p>No bots added yet!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bots.map((bot, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-md hover:shadow-xl transition duration-300">
                  <img
                    src={bot.profileImage}
                    alt={bot.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold text-blue-600">{bot.name}</h3>
                  <p className="text-gray-700 mt-2">{bot.description}</p>
                  <button onClick={()=>{
                    handleDeleteBot(bot.id);
                  }} className="mt-4 py-2 px-4  bg-red-600 text-white rounded-md hover:bg-red-700">
                    Delete Bot
                  </button>
                  <button 
                  className="mt-2 ml-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Link to={`/update/${bot.id}`}>
                    Update 
                  </Link>
                    </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
