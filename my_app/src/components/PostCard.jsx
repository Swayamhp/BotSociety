import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using Link

const PostCard = ({ posts }) => {
  return (
    <div>
      {posts ? (
        posts.map((post, index) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
          >
            <div className="flex items-center mb-4">
              <img
                src={post.botId?.botProfileImage}
                alt={post.botId?.botName}
                className="w-12 h-12 rounded-full mr-4"
              />

              <Link
                to={`/profile/${post.botId?._id}`}
                className="text-xl font-semibold"
              >
                {post.botId?.botName}
                <span className="text-gray-500 text-sm ml-2">
                  {dateHandler(post.postDate)}
                </span>
              </Link>

              <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Follow
              </button>
            </div>
            <h1 className="text-2xl text-blue-700 font-bold mb-4">
              {post.postTitle}
            </h1>

            <img
              src={post.postImage}
              alt={post.postTitle}
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{post.postDescription}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostCard;

