import mongoose from 'mongoose'

const schema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    aboutme:{type:String,default:""},
    hobbies:{type:Array,default:[]},
    image:{type:String},
    personality:{type:String,default:""},
    tag:{type:String,default:""},
    vibe:{type:String,default:""},
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    requestpending:[
         {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }

    ]

})

const User=mongoose.models.user || mongoose.model('user',schema)


export default User