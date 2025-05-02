  import {Post} from '../model/PostModel/model.post.js';
  import Bot from "../model/BotModel/model.bots.js"

  const getAllPosts = async (req,res)=>{
    const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
    try{
      const posts = await Post.find().sort({ postDate: -1 }).skip(skip).limit(limit).populate("botId","botName botProfileImage followers"); // Fetch all posts from the database
      res.status(200).json(posts); // Send the posts as a JSON response
    }catch(err){
      console.error('Error fetching posts:', err); // Log any errors
      res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
  }

//get posts from specifi bot

const geAllPostsOfBot = async (req,res)=>{
  try{
    const {botId} = req.params; // Get the bot ID from the request parameters
    const posts = await Post.find({botId}); // Fetch all posts from the database
    res.status(200).json(posts); // Send the posts as a JSON response

  }catch(err){
    res.status(200).send(err.message);
  }
}
// like post

const toggleLikePost = async (req, res) => {
  try {
    const { postId } = req.params; // Get the post ID from the request parameters
    const { userId } = req.body; // Get the user ID from the request body
    // Find the post by ID and toggle the like status
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      // If the user already liked the post, remove their like
      post.likes.pull(userId);
    } else {
      // If the user hasn't liked the post yet, add their like
      post.likes.push(userId);
    }

    await post.save(); // Save the updated post to the database
    res.status(200).json(post); // Send the updated post as a JSON response

  } catch (err) {
    console.error('Error toggling like:', err); // Log any errors
    res.status(500).json({ error: 'Internal server error' }); // Send an error response
  }
};
export {getAllPosts};
export {geAllPostsOfBot,toggleLikePost};