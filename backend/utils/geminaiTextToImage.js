import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import {Post} from "../model/PostModel/model.post.js";
import { uploadBase64Image } from "./cloudinary.config.js";
import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();

 async function GenAi(textContent) {
  const ai = new GoogleGenAI({ apiKey:process.env.GEMINAI_KEY});

  // const contents =
  //   "Hi, can you create a 3d rendered image of a Godzill " +
  //   "with wings and a top hat flying over a happy " +
  //   "futuristic scifi city with lots of greenery? and write inside the picture i am alive";


  // Set responseModalities to include "Image" so the model can generate  an image
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp-image-generation",
    contents: textContent,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image3.png", buffer);
      console.log("Image saved as gemini-native-image3.png");
      const base64Image = buffer.toString('base64');
      const imageUrl = await uploadBase64Image(base64Image);
      console.log("Image URL:", imageUrl); // Log the image URL
      return imageUrl; // Return the image URL
    }
  }
}


 async function TextContent(textContent) {

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINAI_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: textContent,
  });
  return response.text;
}



async function getText(dummyBot){
  // const dummyBot = {
  //   id: 1,
  //   name: 'TechBot',
  //   profileImage: 'https://picsum.photos/seed/techbot/200/200',
  //   description: 'Health Export',
  //   followers: 100,
  // };
  const content = `Act as a person like having charectersticks of ( ${dummyBot.botDescription}) so you need to give me only one post data in json format.
  the content should be uique and very informative and engaging.
    a json object that contains the following fields:
    1,id: number, unique identifier for the post
    2,title: string, title of the post simple language which any one can understand
    3,textToImage:string ((1200X1000 pixels strict) full description about image and the image should contain some words between them))
    4,description: string,(A short description of the post which should be engaging and relevant to the title)`
  const result = await TextContent(content);
const data = result.slice(7,-4);
return data;
  
}

//handle aiDataForPosts to convert Own posts data
const handleAiDataToPostData = async (bot) => {
  try {
    const data = await getText(bot);
    const aiData = JSON.parse(data); // no await needed
    console.log(aiData);

    const imageData = await GenAi(aiData.textToImage); // image buffer or base64

    const postData = new Post({
      botId: bot._id,
      postTitle: aiData.title,
      postDescription: aiData.description,
      postImage: imageData,
      postDate: new Date(),
    });

    await postData.save()
      .then(() => console.log('Post created successfully!'));

  } catch (err) {
    console.error('Error handling AI data:', err);
  }
};



const generatePosts = async () => {
  try{
    const res = await fetch('http://localhost:3000/api/bots'); // Adjust the URL as needed
const data = await res.json();
console.log('Fetched bots:', data);
data.forEach(async(bot)=>{
 await handleAiDataToPostData(bot);
})
// handleAiDataToPostData(data[0]);

  }catch(err){
    console.error('Error generating posts:', err);
  }
}
// generatePosts();  
cron.schedule("0 */2 * * *", async () => {
  try{
  await generatePosts();  
  }catch(err){
    console.log(err.message);
  }
});
export { generatePosts };