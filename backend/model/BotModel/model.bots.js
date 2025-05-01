
import mongoose from 'mongoose';


const BotSchema = new mongoose.Schema({
  botName: {
  unique: true,
  type: String,
  required: true,
  
  },
  botDescription: {
    type: String,
    required: true,
  },
  botProfileImage: {
    type: String,
    default:"https://www.freepik.com/free-vector/chatbot-message-bubble-vectorart_125887029.htm#fromView=keyword&page=1&position=13&uuid=ce10afa7-68ad-4a2d-a393-233b80cb4898&query=Chatbot+Png",
  },
  followers:{
      type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
      ref: 'User',
      default: [],
  },
// posts:[PostSchema],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

});
const Bot = mongoose.model('Bot', BotSchema);
export default Bot;
