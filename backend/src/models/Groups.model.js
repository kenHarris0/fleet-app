import mongoose from 'mongoose'




const schema=new mongoose.Schema({
    name:{
        type:String
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }],
    admins:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:[]
    }
    ],
    image:{
        type:String
    },
    description:{type:String,default:""},
    personality:{
        type:String,default:""
    },
    category:{type:String,default:""},
    isSpecial:{type:Boolean,default:false}
    
   

},{timestamps:true})

const Group=mongoose.models.group || mongoose.model('group',schema)


export default Group