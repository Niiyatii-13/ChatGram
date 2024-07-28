import mongoose from "mongoose";

const conversationsSchema = new mongoose.Schema({

    participants : [
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
            default:[]
        }
    ]
},{ timestamps: true })

const ConversationModel =mongoose.model.Conversation|| mongoose.model("Conversation", conversationsSchema);

export default ConversationModel;