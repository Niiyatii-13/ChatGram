import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    image:{
        type:String,
        default:""
    },
    friends:[{
        type: mongoose.Schema.Types.Object,
		ref: "User",
        default:[]
    }]
})

const userModel = mongoose.model.User || mongoose.model("User",userSchema)

export default userModel;