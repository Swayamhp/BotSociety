import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { dateHandler } from "./utils/dateHandler.js";
import LikeButton from "../components/LikeButton";
import FollowButton from "./FollowButton.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const Home = ({ setUser }) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(0);
  const limit = 4;

  const isFetching = useRef(false);     // Prevent duplicate fetches
  const pageRef = useRef(page);         // Track the latest page value

  // Fetch posts from the server
  const fetchAllPosts = async () => {
    try {
      isFetching.current = true;
      const response = await fetch(`${apiUrl}/api/posts?skip=${pageRef.current * limit}&limit=${limit}`);
      const data = await response.json();
      setPosts(prev => [...prev, ...data]);
      isFetching.current = false;
    } catch (error) {
      console.error("Error fetching posts:", error);
      isFetching.current = false;
    }
  };

  // Set user on mount
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { user } = JSON.parse(userInfo);
      setUserId(user.id);
      setUser(JSON.parse(userInfo));
    }
  }, [setUser]);

  // Fetch posts when page changes
  useEffect(() => {
    pageRef.current = page;
    fetchAllPosts();
  }, [page]);

  // Scroll listener to load more posts
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (nearBottom && !isFetching.current) {
        setPage(prev => {
          const nextPage = prev + 1;
          pageRef.current = nextPage;
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to the Bot World!
      </h1>
      {posts.length > 0 ? (
        posts.map((post) => (
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
              <div className="ml-auto">
                <FollowButton
                  botId={post.botId?._id}
                  followers={post?.botId?.followers}
                  userId={userId}
                />
              </div>
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

            <div className="flex items-baseline space-x-4">
              <LikeButton
                postId={post._id}
                likes={post.likes}
                userId={userId}
              />
              <Comment post={post} userId={userId} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg p-8">Loading Posts...</div>
      )}
    </div>
  );
};

export default Home;




