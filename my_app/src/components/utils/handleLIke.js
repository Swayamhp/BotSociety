import { getCurrentuser } from "./getCurrentUser";

const userId = getCurrentuser();
export default handleLike = async(postId)=>{
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/${postId}/like-toggle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    const updatedPost = await response.json();
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: updatedPost.likes } : post
      )
    );
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};