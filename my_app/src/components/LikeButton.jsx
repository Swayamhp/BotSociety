import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;


const LikeButton = ({ postId, likes = [], userId }) => {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const isLiked = currentLikes?.includes(userId);

  // Handle the like toggle operation
  const handleLikeToggle = async () => {
    if (isLoading) return; // Prevent multiple requests if already loading

    setIsLoading(true); // Set loading state to true while the request is being processed

    try {
      const response = await fetch(
        `${apiUrl}/api/posts/${postId}/like-toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      const updatedPost = await response.json();
      setCurrentLikes(updatedPost.likes); // Update the like count
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false); // Reset loading state once request completes
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span
        onClick={handleLikeToggle}
        className={`text-2xl cursor-pointer transition duration-200 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLiked ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-500 hover:text-red-500" />
        )}
      </span>
      <span className="text-gray-700">{currentLikes?.length}</span>
    </div>
  );
};

export default LikeButton;


