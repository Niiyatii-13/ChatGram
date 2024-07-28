import userModel from '../models/userModel.js'
const allUsers = async (req,res)=>{

    try {
        const loggedInUserId = req.user.id
        const filteredUsers = await userModel.find({_id:{$ne : loggedInUserId}}).select("-password")

        res.json({success:true, filteredUsers});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const getFriends = async (req,res)=>{

    try {
        const loggedInUserId = req.user.id
        const user = await userModel.findOne({_id:loggedInUserId}).select("-password")

        if(user){
            let friends = user.friends;
            res.json({success:true, friends});
        }
        else{
            res.json({success:true})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {allUsers,getFriends};