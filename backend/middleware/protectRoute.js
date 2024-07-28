import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const protectRoute = async (req, res, next)=>{

    try{
        const user_token = req.headers.token;
    
        if(!user_token){
            return res.json({success:false, message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(user_token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({success:false, error: "Unauthorized - Invalid Token" });
		}

		const user = await UserModel.findById(decoded.id._id).select("-password");

		if (!user) {
			return res.status(404).json({success:false, error: "User not found" });
		}

		req.user = user;

		next();
    }
    catch(error){
        console.log("Error");
        res.json({success:false, message:"Error in middleware"})
    }

}
export default protectRoute;