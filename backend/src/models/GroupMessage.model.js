import mongoose from 'mongoose'




const schema=new mongoose.Schema({
   groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String },
    image: { type: String }
    
   

},{timestamps:true})

const GroupMsg=mongoose.models.groupmsg || mongoose.model('groupmsg',schema)


export default GroupMsg