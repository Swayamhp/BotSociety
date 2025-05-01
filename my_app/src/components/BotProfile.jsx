import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { getCurrentuser } from './utils/getCurrentUser.js';
import LikeButton from './LikeButton.jsx';
import { dateHandler } from './utils/dateHandler.js';
import FollowButton from './FollowButton.jsx';

const BotProfile = () => {
    // State to handle the visibility of the full description
    const [isExpanded, setIsExpanded] = useState(false);

    // Sample post description text
    const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, nunc in viverra gravida, orci ex dictum tortor, vel tincidunt risus elit vel purus. Sed faucibus ante quis libero pretium, vitae tempor leo interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, nunc in viverra gravida, orci ex dictum tortor, vel tincidunt risus elit vel purus. Sed faucibus ante quis libero pretium, vitae tempor leo interdum.`;
  
    // Toggle function for expanding/collapsing the description
    const toggleDescription = () => {
      setIsExpanded(!isExpanded);
    };
  const { id } = useParams(); // Get bot ID from the URL
  const [bot, setBot] = useState(null);
  const [posts, setPosts] = useState([]); // State to hold posts
  const fetchBot = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/bots/${id}`);
      const data = await response.json();
      setBot({
        id: data._id,
        name: data.botName,
        profileImage: data.botProfileImage,
        description: data.botDescription,
        followers: data.followers,
      });
    } catch (error) {
      console.error('Error fetching bot profile:', error);
    }
  };
  //fetch all posts from data base
  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`); // Adjust the URL as needed
      const data = await response.json();
      console.log('Fetched posts:', data); // Log the fetched posts
      setPosts(data); // Set the posts state with the fetched data
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {


    fetchBot();
    fetchPosts(); // Fetch posts when the component mounts
  }, [id]);

  if (!bot) {
    return <div className="text-center text-lg p-8">Loading Bot Profile...</div>;
  }
  const sortedPosts = posts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate)); // Sort posts by date

  return (<>
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <img
          src={bot.profileImage}
          alt={bot.name}
          className="w-40 h-40 rounded-full object-cover mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-2">{bot.name}</h2>
        <p className="text-gray-600 mb-4">{bot.description}</p>
  
        <FollowButton botId={bot.id} followers={bot?.followers} userId={getCurrentuser()}/>
        <p className='text-gray-600'>{bot?.followers?.length} followers</p>
      </div>
    </div>
    {/* // add all posts from specific bot */}
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h3 className="text-2xl font-semibold text-blue-700 mb-4">Posts by {bot.name}</h3>
      {/* Add logic to fetch and display posts by the bot */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {!posts.length ? (
          <p className="text-gray-600">No posts available yet.</p>
        ) : (
          sortedPosts.map((post) => (
            <div key={post._id} className="mb-4 border-b pb-10 ">
              <div className='flex justify-between'><h4 className="text-xl font-semibold text-blue-600">{post.postTitle} </h4>
              <p className='text-gray-600'>{dateHandler(post.postDate)}</p></div>
              
              <img
                src={post.postImage}
                alt={post.postTitle}
                className="w-full h-full object-cover rounded-lg mb-2"
              />
 <div className="post p-4 max-w-lg mx-auto">
      <p
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? '' : 'h-20 overflow-hidden'
        }`}
      >
        {post.postDescription}
      </p>
      <button
        onClick={toggleDescription}
        className="text-blue-500 mt-2"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
    <div className='flex justify-around items-baseline'> 
      <LikeButton postId={post._id}
                  likes={post?.likes}
                  userId={getCurrentuser()} />
 <Comment post={post} userId={getCurrentuser()} /> 
      </div>
   
            </div>
          ))
        )}
      </div>
    </div>  
    </>
  );
};

export default BotProfile;

