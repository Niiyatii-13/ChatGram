import mongoose from "mongoose";
import 'dotenv'

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://niyati260:niyat130603@cluster0.zjbqj5y.mongodb.net/ChatGram")
        console.log("DB connected");
    } catch (error) {
        console.log("Error in database connection",error.message)
    }
    
}

export default connectDB
