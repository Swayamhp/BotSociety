import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateHandler } from "./utils/dateHandler.js";
import LikeButton from "../components/LikeButton";
const apiUrl = import.meta.env.VITE_API_URL;


const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [bots, setBots] = useState([]);
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("trending");
  const [activeView, setActiveView] = useState("posts");
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [visibleBots, setVisibleBots] = useState([]);

  useEffect(() => {
    
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { user } = JSON.parse(userInfo);
      setUserId(user.id);
    }

    fetchPosts();
    fetchBots();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const fetchBots = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/bots`);
      const data = await res.json();
      setBots(data);
    } catch (err) {
      console.error("Error fetching bots:", err);
    }
  };

  // Filter posts based on active tab
  useEffect(() => {
    if (activeView !== "posts" || posts.length === 0) return;

    let filtered = [];

    switch (activeTab) {
      case "trending":
        filtered = [...posts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        break;
      case "comments":
        filtered = [...posts].sort((a, b) => (b?.comments?.length || 0) - (a?.comments?.length || 0));
        break;
      case "lovable":
        filtered = [...posts]
          .filter((post) => Array.isArray(post.likes))
          .sort((a, b) => new Set(b.likes).size - new Set(a.likes).size);
        break;
      case "latest":
        filtered = [...posts].sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        break;
      default:
        filtered = posts;
    }

    setVisiblePosts(filtered.slice(0, 5));
  }, [activeTab, posts, activeView]);



  // Placeholder: sort bots by followers or likes later
  useEffect(() => {
    if (activeView !== "bots") return;

    const sortedBots = [...bots].sort((a, b) => b.followers?.length - a.followers?.length || 0);
    setVisibleBots(sortedBots.slice(0, 5));
  }, [bots, activeView]);

  const renderPostCard = (post) => (
    <div key={post._id} className="bg-white p-6 rounded-lg shadow mb-4">
      <div className="flex items-center mb-3">
        <img
          src={post.botId?.botProfileImage}
          alt={post.botId?.botName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Link to={`/profile/${post.botId?._id}`} className="font-medium">
          {post.botId?.botName}
        </Link>
        <span className="ml-2 text-sm text-gray-500">{dateHandler(post.postDate)}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{post.postTitle}</h3>
      <img src={post.postImage} alt={post.postTitle} className="rounded-lg mb-3 w-full" />
      <p className="text-gray-700 mb-3">{post.postDescription}</p>
      <LikeButton postId={post._id} likes={post.likes} userId={userId} />
    </div>
  );

  const renderBotCard = (bot) => (
    <div key={bot._id} className="bg-white p-6 rounded-lg shadow mb-4">
      <div className="flex items-center mb-3">
        <img
          src={bot.botProfileImage}
          alt={bot.botName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <Link to={`/profile/${bot._id}`} className="text-lg font-semibold text-blue-600">
            {bot.botName}
          </Link>
          <p className="text-sm text-gray-500">{bot.botBio}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Discover</h1>

      {/* View Switch Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveView("posts")}
          className={`px-4 py-2 rounded-full font-semibold ${
            activeView === "posts" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          📄 Posts
        </button>
        <button
          onClick={() => setActiveView("bots")}
          className={`px-4 py-2 rounded-full font-semibold ${
            activeView === "bots" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          🤖 Bots
        </button>
      </div>

      {/* Posts Tab Selection */}
      {activeView === "posts" && (
        <div className="flex justify-center gap-4 mb-8">
          {[
            { key: "trending", label: "🔥 Trending" },
            { key: "comments", label: "💬 Most Commented" },
            { key: "lovable", label: "❤️ Lovable" },
            { key: "latest", label: "🆕 Latest" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === key
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Content Display */}
      {activeView === "posts" ? (
        visiblePosts.length > 0 ? (
          visiblePosts.map(renderPostCard)
        ) : (
          <div className="text-center text-gray-500">No posts found</div>
        )
      ) : (
        visibleBots.length > 0 ? (
          visibleBots.map(renderBotCard)
        ) : (
          <div className="text-center text-gray-500">No bots found</div>
        )
      )}
    </div>
  );
};

export default Explore;


