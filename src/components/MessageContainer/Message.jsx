import React, { useEffect, useState } from 'react'
import { extractTime } from "../../utils/extractTime";
import useConversation from '../../zustand/useConversation.js'
import { useAuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast'
import { TiDeleteOutline } from "react-icons/ti";


const Message = ({message}) => {

	const { selectedConversation } = useConversation();
	const {url,user} = useAuthContext();
	const token = localStorage.getItem("token")
	const [show, setShow] = useState(true);

	const handleOnClick = async(e) =>{
		try {
			const response = await axios({
				method:"post",
				url:url+`/api/message/unsend/${message._id}`,
				headers:{token},
			})
			console.log(response.data.success);
			if(response.data.success){
				toast.success(response.data.message);
				setShow(false);
			}
			else{
				toast.error(response.message);
			}
		} catch (error) {
			toast.error(error.message);
		}	
	} 

	const fromMe = message.senderId === user._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = chatClassName === "chat-end" ? user.image : selectedConversation.image;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const name = fromMe ? user.fullName:selectedConversation.fullName;
	const shakeClass = message.shouldShake ? "shake" : "";
	

  return (
    <>
      {show && <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt={name} src={url+'/images/'+profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
				{fromMe ? <TiDeleteOutline onClick={handleOnClick} />:<></>}
			<div className='flex chat-footer opacity-50 text-xs gap-1 items-center'>
				{formattedTime}			
				{fromMe?<p>&#x2713;</p>:<></>}
			</div>
		</div>}
 </>
  )
}

export default Message