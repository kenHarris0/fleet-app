    import mongoose from 'mongoose'

    const schema=new mongoose.Schema({
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    chatBackground: { type: String, default: null },

    })

    const Chat=mongoose.models.chat || mongoose.model('chat',schema)


    export default Chat