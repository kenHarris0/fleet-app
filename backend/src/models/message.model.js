import mongoose from 'mongoose'




const schema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    text:{type:String},
    image:{type:String},
    reactions:[
        {
            emoji: { type: String },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        }
    ]
   

},{timestamps:true})

const Message=mongoose.models.message || mongoose.model('message',schema)


export default Message