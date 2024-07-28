import ConversationModel from "../models/conversationModel.js";
import MessageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import { io } from "../socket/socket.js";
import {getReceiverSocketId} from '../socket/socket.js'


const sendMessage = async (req,res)=>{

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await ConversationModel.findOne({
            participants : {$all:[senderId,receiverId]}
        })


        if(!conversation){
            conversation = await ConversationModel.create({
                participants:[senderId,receiverId],messages:[]
            })
        }
        const newMessage =  new MessageModel({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }

        res.json({success:true,newMessage});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in send message"})
    }
}

const getMessages = async(req,res)=>{

    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        
        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json({success:true,messages:[]});

        const messages = conversation.messages;

        res.json({success:true,messages,message:"No error"});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in get message"})
    }
}

const unsendMessage = async(req,res)=>{

    try {
        const {_id} = req.params;

        await MessageModel.findByIdAndDelete(_id);

        res.json({success:true,message:"Message unsent"});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in delete message"})
    }
}

export {sendMessage,getMessages, unsendMessage}