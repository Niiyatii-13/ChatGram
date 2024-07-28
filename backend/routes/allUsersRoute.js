import { allUsers,getFriends } from "../controllers/allUsers.js";
import express from "express"
import protectRoute from "../middleware/protectRoute.js";

const allUsersRoute = express.Router()

allUsersRoute.get('/getUsers',protectRoute,allUsers);
allUsersRoute.get('/getFriends',protectRoute,getFriends);

export default allUsersRoute