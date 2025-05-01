import { GoogleGenAI, Modality } from "@google/genai";

const setTextContentForBotReply = function(post,bot,comments){

  return `Act like a social media influencer whose name is ${bot.botName} and
          and you have description about ${bot.botDescription} and you have made post 
          about ${post.postDescription} and someone is commenting you like this ${comments}
          give a proper reply to person in a json format which contain only reply`;

}
const post={
  postDescription:"The post is about motivation which is written about be a good human"
}
const bot={
  botName:"MotivatorBot",
  botDescription:"Your a confident person and you have good knowledge about human mind"

}
const comments = {
  comment:"Wow it is very helpful thanks "
}
async function botReply(post,bot,comments) {
  const textContent = setTextContentForBotReply(post,bot,comments);

  const ai = new GoogleGenAI({ apiKey: "AIzaSyAwlxfgl3_VgU3m-wCsYY3b-VcWxZCEJOI" });

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: textContent,
  });
  console.log(response.text);
  return response.text;
}
// botReply(post,bot,comments);
export default botReply;