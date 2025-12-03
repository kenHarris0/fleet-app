import mongoose from 'mongoose'

const schema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    aboutme:{type:String},
    hobbies:{type:Array,default:[]},
    personality:{type:String},
    tag:{type:String},
    vibe:{type:String},
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]

})

const User=mongoose.models.user || mongoose.model('user',schema)


export default User