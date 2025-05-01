import Bot from '../model/BotModel/model.bots.js';
import { generatePosts } from '../utils/geminaiTextToImage.js';

export const createBot = async(req,res) => {
  try{
    const { name, description, profileImage } = req.body;
    
     // Log the received data

    // Create a new bot instance
    const demoBot = new Bot({
      botName:name,
      botDescription: description,
      botProfileImage:profileImage,
    });
    // Save the bot to the database
    await  demoBot.save()
      .then(() => console.log('Demo bot saved!1'))
      .catch(err => console.error('Error saving bot:', err));
      await
    
    
   demoBot.save()
      .then(() => console.log('Demo bot saved!2'))
      .catch(err => console.error('Error saving bot:', err));
      res.status(200).json({message: 'Bot created successfully! Done'});
      await generatePosts();
  }catch(err){
    console.error('Error creating bot:', err);
    res.status(500).json({error: 'Internal server error'});
  }
  }

  //get all bots
export const getAllBots = async (req, res) => {
  try {
    const bots = await Bot.find(); // Fetch all bots from the database
    res.status(200).json(bots); // Send the bots as a JSON response
  } catch (error) {
    console.error('Error fetching bots:', error); // Log any errors
    res.status(500).json({ error: 'Internal server error' }); // Send an error response
  }
}

//delete bot
export const deleteBot = async (req, res) => {
  try {
    const { id } = req.params; // Get the bot ID from the request parameters
    console.log('Deleting bot with ID:', id); // Log the bot ID to be deleted
    await Bot.findByIdAndDelete(id); // Delete the bot from the database
    res.status(200).json({ message: 'Bot deleted successfully!' }); // Send a success response
  } catch (error) {
    console.error('Error deleting bot:', error); // Log any errors
    res.status(500).json({ error: 'Internal server error' }); // Send an error response
  }
}

//get single bot
export const getSingleBot = async (req, res) => {
  try {
    const { id } = req.params; // Get the bot ID from the request parameters
    console.log('Fetching bot with ID:', id); // Log the bot ID to be fetched
    const bot = await Bot.findById(id); // Fetch the bot from the database
    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' }); // Send a 404 response if not found
    }
    res.status(200).json(bot); // Send the bot as a JSON response
  } catch (error) {
    console.error('Error fetching bot:', error); // Log any errors
    res.status(500).json({ error: 'Internal server error' }); // Send an error response
  }
}

//update bot profile
export const updateBotProfile = async (req, res) => {
  try {
    const { id } = req.params; // Get the bot ID from the request parameters
    const { name, description, profileImage } = req.body; // Get the updated data from the request body

    // Find the bot by ID and update its details
    const updatedBot = await Bot.findByIdAndUpdate(
      id,
      {
        botName: name,
        botDescription: description,
        botProfileImage: profileImage,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBot) {
      return res.status(404).json({ error: 'Bot not found' }); // Send a 404 response if not found
    }

    res.status(200).json(updatedBot); // Send the updated bot as a JSON response
  } catch (error) {
    console.error('Error updating bot profile:', error); // Log any errors
    res.status(500).json({ error: 'Internal server error' }); // Send an error response
  }
}
export const toggleBotFollow = async(req,res)=>{
  try{
    const { id} = req.params;
    const { userId} = req.body;
    const botId = id;
    const bot = await Bot.findById(botId);
     console.log(userId);
    if(bot?.followers.includes(userId)){
      bot?.followers.pull(userId);
    }else{
      bot?.followers.push(userId);
    }
    await bot.save();
    console.log(bot);
    res.status(200).json({response:bot})

  }catch(err){
    res.status(400).json({error:err.message});
  }
}
