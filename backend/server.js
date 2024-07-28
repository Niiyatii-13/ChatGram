import express from "express"
import dotenv from 'dotenv'
import path from "path"
import cors from "cors"
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import messageRoute from "./routes/messageRoute.js"
import allUsersRoute from "./routes/allUsersRoute.js"

import {app,server} from './socket/socket.js'

// const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
dotenv.config();

const __dirname = path.resolve();

   
app.use(express.json());
app.use(cors())

app.use("/images", express.static('uploads'));
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)
app.use("/api/users",allUsersRoute)


app.get('/',(req,res)=>{
    console.log("Server running")
    res.send("Server Running")
})

server.listen(PORT,()=>{
    console.log(`Port is running at http://localhost:${PORT}`)
})