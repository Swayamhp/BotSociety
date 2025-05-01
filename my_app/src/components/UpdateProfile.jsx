import {  useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;


const UpdateProfile = ({ bot, onClose }) => {
  //get bot id from params
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    profileImage: '',
  });


  // Fetch the bot's current profile data when the component mounts
const fetchBotProfile = () => {
    fetch(`${apiUrl}/api/bots/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedBot = {
          id: data._id,
          name: data.botName,
          profileImage: data.botProfileImage,
          description: data.botDescription,
        };
        setProfile(formattedBot);
      })
      .catch((error) => console.error('Error fetching bot profile:', error));

  };
  useEffect(() => {
    fetchBotProfile();
  }, [id]); // Fetch when the component mounts or when the bot ID changes 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    if (profile.name && profile.description && profile.profileImage) {
      fetch(`${apiUrl}/api/updatebot/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          alert('Profile updated successfully!');
          navigate(`/admin`); // Redirect to the bot's profile page after update
          
          
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to update profile!');
        });
    } else {
      alert('Please fill in all the fields!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={()=>navigate('/admin')} // clicking outside will close
    >
      {/* Blurry background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

      {/* Modal content */}
      <div 
        className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl z-10"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Your Profile</h2>

        <label className="block text-left mb-2 font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={profile.name}
          onChange={handleInputChange}
          className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block text-left mb-2 font-semibold text-gray-700">Description</label>
        <textarea
          type="text"
          name="description"
          placeholder="Enter Description"
          value={profile.description}
          onChange={handleInputChange}
          className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block text-left mb-2 font-semibold text-gray-700">Profile Image URL</label>
        <input
          type="text"
          name="profileImage"
          placeholder="Enter Profile Image URL"
          value={profile.profileImage}
          onChange={handleInputChange}
          className="border p-2 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end space-x-4">
          <button
            onClick={()=> navigate('/admin')} // close modal
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
