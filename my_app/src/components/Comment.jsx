// src/components/Comment.jsx
import React, { useState, useEffect } from "react";
import { dateHandler } from "./utils/dateHandler.js";
import SmallSpinner from "./utils/SmallSpinner.jsx";
const apiUrl = import.meta.env.VITE_API_URL;


const Comment = ({ post, userId }) => {
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]); // ✅ store all comments
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/posts/${post._id}/comment`
      ); // Assume you have API to get comments
      const data = await response.json();
      setComments(data.allCommentData); // Assuming backend returns { comments: [...] }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleCommentSubmit = async (post) => {
    if (!userId) {
      alert("You need to login for comment!");
    }
    fetchComments(post);
    if (!commentText.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      console.log(commentText);
      const response = await fetch(
        `${apiUrl}/api/posts/${post._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, commentText: commentText }),
        }
      );

      if (response.ok) {
        console.log("Comment submitted!");
        setCommentText("");
        fetchComments(); // ✅ re-fetch comments after adding new one
        // refreshPosts();  // optional if you want to refresh entire posts
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
    if (commentBoxOpen) {
      fetchComments(); // fetch only when comment box opens
    }
  }, [commentBoxOpen]);

  return (
    <div className="">
      <button
        onClick={() => setCommentBoxOpen(!commentBoxOpen)}
        className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        {commentBoxOpen ? "Close" : `Comments ${comments.length}`}
      </button>

      {commentBoxOpen && (
        <div className="mt-4">
          {/* Comments List */}
          <div className="mb-4">
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <div key={index} className="border-b p-2">
                  <div key={index} className="border-b p-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-600">
                        User- {c.userId.userName}
                      </span>
                      <span className="text-gray-600">
                        {dateHandler(c.commentDate)}
                      </span>
                    </div>
                    <p className="text-gray-700">{c.commentText}</p>

                    <span className="font-semibold text-blue-600">
                      Bot- {post.botId.botName}
                    </span>
                    <p className="text-gray-700">{c.botReply}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet. Be the first!</p>
            )}
          </div>

          {/* Add new comment */}
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border p-2 rounded mb-2"
          ></textarea>
          <button
            onClick={() => {
              setLoading(true);
              handleCommentSubmit(post, userId);
            }}
            className="bg-blue-600 w-60 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Comment {loading && <SmallSpinner/>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
