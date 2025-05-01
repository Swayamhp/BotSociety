import { Comment,Post } from "../model/PostModel/model.post.js";
import   botReply from "../utils/botReplyToComment.js";
import Bot from "../model/BotModel/model.bots.js";


const postComment = async(req,res)=>{
  try{
    const {id} = req.params;
    const { commentText,userId} = req.body;
    const postInfo = await Post.findById(id).populate("botId","botName botDescription");
    const getBotReply = await botReply(postInfo,postInfo.botId,commentText);
         
     const replyData = JSON.parse(getBotReply.slice(7,-4));
    const createComment = new Comment ({
      commentText,
      postId:id,
      userId,
      botReply:replyData.reply,

    });
    await createComment.save();
    res.status(200).json({message:"comment post successfully!"});

  }catch(err){
    res.status(400).json({error:err.message});
  }
};

const getAllCommentsOfPost = async(req,res)=>{
  try{
    const {id} = req.params;
    const commentsGet = await Comment.find({postId:id}).populate("userId","userName");

    res.status(200).json({allCommentData:commentsGet});
  }catch(err){
    res.status(400).json({error:err.message});
  }
};

export {postComment,getAllCommentsOfPost};