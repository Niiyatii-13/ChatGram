import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import Profile from './Profile.jsx'
import axios from 'axios'
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { useAuthContext } from '../../context/AuthContext.jsx'

const Sidebar = () => {
	const {url} = useAuthContext();
	const [user, setUser] = useState({});
	const [showProfile,setShowProfile] = useState(false);
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


	if(showProfile){
		return(
			<>
			<div className='flex flex-col gap-2 w-1/3 items-center justify-start mb-10 mt-10'>
				<div className='w-32 max-[620px]:w-24 rounded-full shadow-[0px_0px_18px_0px_#f7fafc]'>
					<img className='rounded-full'src={url+'/images/'+user.image} alt={user.fullName}/>
				</div>
				{/* <span className=' mb-8 text-center text-base'>&#x270E;</span> */}
				<i class="fa-regular fa-pen-to-square"></i>
				<div className='flex flex-col w-full justify-start mb-auto gap-6'>
					<div className='mx-3 h-16 flex items-center justify-center rounded-full border-zinc-600 border-2 shadow-[0px_0px_10px_0px_#f7fafc]'>
						<p className='max-[620px]:text-xs text-2xl text-zinc-300 font-bold'>Name : {user.fullName} </p>    
					</div>
					<div className='mx-3 h-16 flex items-center justify-center rounded-full border-zinc-600 border-2 shadow-[0px_0px_10px_0px_#f7fafc]'>
						<p className='max-[620px]:text-xs text-2xl text-zinc-300 font-bold'>Username : {user.username} </p>    
					</div>
					<div className='mx-3 h-16 flex items-center justify-center rounded-full border-zinc-600 border-2 shadow-[0px_0px_10px_0px_#f7fafc]'>
						<p className='max-[620px]:text-xs text-2xl text-zinc-300 font-bold'>Gender : {user.gender} </p>    
					</div>
   			 </div>
    		</div>
    		
			<div onClick = {(showProfile)=>{setShowProfile(!showProfile)}}className='font-bold cursor-pointer mt-auto ml-4 mb-6' >
				<IoMdArrowRoundBack />
			</div>
			
			</>
		)
	}
	else
  return (
	<div className='flex flex-col w-1/3 h-full'>
		<div className='border-r border-slate-500 p-4 flex flex-col overflow-auto'>
				<SearchInput />
				<div className='divider px-3'></div>
				<Conversations />
		</div> 
		<div className='mt-auto p-4 flex flex-col'>
			<Profile showProfile={showProfile} setShowProfile = {setShowProfile}/>	
		</div>
	</div>
  )
}

export default Sidebar
