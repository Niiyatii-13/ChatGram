import {React,useState,useEffect} from 'react'
import axios from "axios"
import Conversation from './Conversation.jsx'
import useGetFriends from '../../hooks/useGetFriends.js'

const Conversations = () => {


	const {loading,friends} = useGetFriends();
	const length = friends.length
	
	if(loading){
		return <span className="loading loading-spinner loading-md"></span>
	}
  return (
    <div className='flex flex-col py-2 overflow-scroll'>
		{friends.map((item,index)=>{
			return <Conversation key = {index} item = {item} lastIndex={index === friends.length - 1? false:true}/> 
		})}
		{!length && <p className='text-xl text-center text-slate-300'>Add friends to start talking</p>}
    </div>
  )
}

export default Conversations