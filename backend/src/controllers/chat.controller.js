import Chat from '../models/chatModel.js'
import cloudinary from '../lib/cloudinary.js'

export const updateChatbg = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId, bgimg } = req.body;

    let img = null;
    if (bgimg) {
      const upload = await cloudinary.uploader.upload(bgimg);
      img = upload.secure_url;
    }

    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (!chat) {
      chat = await Chat.create({
        members: [senderId, receiverId],
        chatBackground: img
      });
    } else {
      chat.chatBackground = img;
      await chat.save(); 
    }

    res.json({ success: true, chatBackground: img });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};


export const getaallchats=async(req,res)=>{
    try{
         const chats=await Chat.find()
         res.json(chats)

    }
catch(err){
        console.log(err)
    }

}