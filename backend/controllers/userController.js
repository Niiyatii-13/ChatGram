import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";
import 'dotenv/config'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const signUp = async(req,res)=>{

    try{

        const {fullName, username, password, confirmPassword,gender} = req.body;
        // let image_filename = `${req.file.filename}`

        if(password !== confirmPassword){
            return res.json({success:false, message:"Passwords do not match"})
        }

        const user = await userModel.findOne({username});

        if(user) return res.json({success:false,message:"User already exists"})
        
        
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullName,
            username,
            password:hashedPassword,
            gender,
            image:"" 
        })

        if(newUser){

            const token = createToken(newUser)
            await newUser.save()

            res.json({success:true,token});
        }
        else {
            res.json({success:false,message:"Invalid User Credentials"})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

const logIn = async (req,res) =>{

    try {
        const {username, password} = req.body;

        const user = await userModel.findOne({username});

        if(!user) return res.json({success:false,message:"User does not exists"})
        
        const passwordCorrect = await bcrypt.compare(password,user.password)


        if(!passwordCorrect){
            return res.json({success:false, message:"Invalid password"})
        }

        const token = createToken(user);

        res.json({success:true,token});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}
const currentUser = async(req,res)=>{

    try {
        const token = req.headers.token;
        const user = jwt.decode(token,process.env.JWT_SECRET);

        res.json({success:true,user});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const addToFriend = async(req,res) =>{

    try {
        const currentUserId = req.user._id;
        const friendToAddId = req.params.id;
        const user = await userModel.findOne({_id:currentUserId});

        for(let i = 0; i<user.friends.length; i++){
            if(user.friends[i]._id.toString() === friendToAddId)return res.json({success:true,message:"Friend added already"});
        }
        const friendToAdd = await userModel.findOne({_id:friendToAddId});
        await user.friends.push(friendToAdd);
        
        await userModel.findByIdAndUpdate({_id:currentUserId}, {friends:user.friends});

        
        res.json({success:true,message:"Friend Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const removeFriend = async(req,res) =>{

    try {
        const currentUserId = req.user._id;
        const friendToAddId = req.params.id;
        const user = await userModel.findOne({_id:currentUserId});

        let len = user.friends.length;
        for(let i = 0; i<len; i++){
            if(user.friends[i]._id.toString() === friendToAddId){
                console.log(user.friends);
                user.friends.splice(i,1);
                console.log(user.friends);
                await userModel.findByIdAndUpdate({_id:currentUserId}, {friends:user.friends});
                return res.json({success:true,message:"Friend removed from the list"});
            }
        }
        return res.json({success:false,message:"Friend removed from the list"});        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {signUp, logIn, currentUser, addToFriend, removeFriend}