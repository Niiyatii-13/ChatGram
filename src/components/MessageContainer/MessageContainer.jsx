import React, { useEffect, useState } from 'react'
import MessageInput from './MessageInput.jsx'
import Messages from './Messages.jsx'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation.js';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext.jsx';
import { useSocketContext } from '../../context/SocketContext.jsx';
import ProfileContainer from './ProfileContainer.jsx';

const MessageContainer = () => {

	const {url} = useAuthContext();
	const [showProfile,setShowProfile] = useState(false);
	const {selectedConversation, setSelectedConversation} = useConversation();
	const noChatSelected = selectedConversation===null ? true : false;

	useEffect(()=>{
		setSelectedConversation(null)
	},[])

  return (
	<div className='flex-grow w-full md:w-2/3 flex flex-col justify-center h-full'>
    {
		noChatSelected ?  (<NoChatSelected/>):
		(
			<>
				{!showProfile ? <>
								<div onClick = {() => setShowProfile(!showProfile)} className='flex cursor-pointer rounded-[2rem] border-zinc-800 border-1 bg-gradient-to-r from-slate-900 to-slate-800 h-20 items-center px-4 py-2 mr-2 ml-2 mt-2 '>
									<hr />
									<div className='w-14'>
										<img className = "rounded-full" src={url+'/images/'+selectedConversation.image} alt={selectedConversation.fullName}/>	
									</div>
									<span className='my-1 mx-4 text-white font-bold'>{selectedConversation.fullName}</span>
								</div>
									<Messages />
									<MessageInput />
								</>
			: <ProfileContainer selectedConversation = {selectedConversation} setShowProfile = {setShowProfile}/>}
			</>
		)}
	</div>
  )
}

const NoChatSelected = () =>{
	const {url} = useAuthContext();
	const [user, setUser] = useState({});
	const token = localStorage.getItem("token")
	
	const getCurrentUser = async () =>{
		const response = await axios({
			method:"get",
			url:url+'/api/user/thisUser',
			headers:{token},
			})
		if(response.data.success){
			setUser(response.data.user.id)
		}
	}
	useEffect(()=>{
		getCurrentUser()
	},[token])
	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome, {user.fullName}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	)
}

export default MessageContainer