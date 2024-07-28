import React, { useEffect, useState } from 'react'
import { useSocketContext } from "../../context/SocketContext";
import useConversation from '../../zustand/useConversation.js'
import { useAuthContext } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast'
import axios from 'axios'




const Conversation = ({lastIndex,item}) => {

  const [messages,setMessages] = useState([]);
  const token = localStorage.getItem("token")
  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelectedConversation = selectedConversation?._id ===  item._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(item._id);
  const {url,user} = useAuthContext();
  const fromMe = messages[messages.length-1]?.senderId == user._id;

  const getMessage = async()=>{
      try {
        const response = await axios({
          method:"get",
          url:url+`/api/message/${item._id}`,
          headers:{token},
        })
        if(response.data.success){
          setMessages(response.data.messages)
        }
        } catch (error) {
          toast.error(error.message);
      }  
    }
  useEffect(()=>{
    getMessage();
  },[])

  return (
    <>
    <div onClick = {()=> setSelectedConversation(item)}className={`flex max-[640px]:h-16 h-20 gap-2 my-2 items-center hover:bg-slate-800 rounded-3xl p-2 py-1 cursor-pointer ${isSelectedConversation?"bg-gradient-to-r from-gray-700 to-gray-800":""}`}>
        <div className={`avatar ${isOnline ? "online":""}`}>
 			    <div className='w-16 max-[640px]:w-8 rounded-full '>
 						<img src={url+'/images/'+item.image} alt={item.fullName}/>
 					</div>
 			</div>
            <div className='flex flex-col justify-between gap-1'>
                    <p className='font-bold text-gray-200 max-[640px]:text-xs'>{item.fullName}</p>
                    <div className='flex items-end gap-1'>
                      { messages.length>0&&fromMe?<p className='text-xs'>&#x2713;</p>:<></>
                      }
                      {
                        messages.length > 0 ? <p className='text-xs'>{messages[messages.length-1].message.slice(0,20)}</p>
                        :<p className='text-xs'>Start Conversation</p> 
                      }
                      { messages.length>0 &&  
                        messages[messages.length-1].message.length > 20 ? <p className='text-xs'>...</p> : <></>
                      }
                    </div>
            </div>
        </div>
      <div>
    </div>
    {!lastIndex ? <></>:<hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />}
    </>
        
  )
}

export default Conversation
