import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuthContext } from '../../context/AuthContext';
import RemoveFriend from './RemoveFriend';

const ProfileContainer = ({selectedConversation,setShowProfile}) => {
    const {url} = useAuthContext();
  return (
    <>
    <div className='flex flex-col items-center justify-start mb-10 mt-10'>
        <div className='w-48 rounded-full shadow-[0px_0px_18px_0px_#f7fafc]'>
              <img className='rounded-full'src={url+'/images/'+selectedConversation.image} alt={selectedConversation.fullName}/>
          </div>
    </div>
    <div className='flex flex-col justify-start mb-auto gap-6'>
        <div className=''>
            <p className='text-start p-3 pl-6 h-16 mx-6 rounded-full border-zinc-600 border-2 text-2xl text-zinc-300 font-bold shadow-[0px_0px_10px_0px_#f7fafc]'>Name : {selectedConversation.fullName}</p>    
        </div>
        <div className=''>
            <p className='text-start p-3 pl-6 h-16 mx-6 rounded-full border-zinc-600 border-2 text-2xl text-zinc-300 font-bold shadow-[0px_0px_10px_0px_#f7fafc]'>Username : {selectedConversation.username}</p>
        </div>
        <div className=''>
            <p className='text-start p-3 pl-6 h-16 mx-6 rounded-full border-zinc-600 border-2 text-2xl text-zinc-300 font-bold shadow-[0px_0px_10px_0px_#f7fafc]'>Gender : {selectedConversation.gender}</p>
        </div>
        <RemoveFriend selectedConversation={selectedConversation} />
    </div>
    <div onClick = {(item)=>{setShowProfile(!item)}}className='font-bold cursor-pointer mt-auto ml-4 mb-6' >
        <IoMdArrowRoundBack />
    </div>
    </>
    
  )
}

export default ProfileContainer