import React, { useState } from "react";

const FollowButton = ({ botId, followers=[], userId }) => {
  const [currentFollowers, setCurrentFollowers] = useState(followers);
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const isFollowing = currentFollowers?.includes(userId);
  const [follow,setFollow] = useState(isFollowing);
  

  // Handle the follow toggle operation
  const handleFollowToggle = async () => {
    if (isLoading) return; // Prevent multiple requests if already loading

    setIsLoading(true); // Set loading state to true while the request is being processed

    try {
      const response = await fetch(
        `http://localhost:3000/api/bots/${botId}/toggle-follow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle follow");
      }

      const updatedUser = await response.json();
      setCurrentFollowers(updatedUser.followers); // Update the followers list
    } catch (error) {
      console.error("Error toggling follow:", error);
    } finally {
      setIsLoading(false); // Reset loading state once request completes
    }
  };

  return (
    <button
      onClick={()=>{
        handleFollowToggle();
        setFollow(()=>!follow);
      }}
      disabled={isLoading}
      className={`px-4 py-2 rounded cursor-pointer ${
        follow
          ? "bg-blue-500 text-white"
          : "bg-gray-300 text-black hover:bg-blue-500 hover:text-white"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {follow ? "Following  " : "Follow  "}
    </button>
  );
};

export default FollowButton;