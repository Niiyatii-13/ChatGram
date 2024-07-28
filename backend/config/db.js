import mongoose from "mongoose";
import 'dotenv'

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://tanishqjain7310:Tanishq071003@cluster0.iiv3upu.mongodb.net/chatApp?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB connected");
    } catch (error) {
        console.log("Error in database connection",error.message)
    }
    
}

export default connectDB