import {React,useState,useEffect} from 'react'
import axios from "axios"
import Person from './Person.jsx'
import useGetConversations from '../../hooks/useGetConversations.js'
import useGetFriends from '../../hooks/useGetFriends.js'

const SearchResults = () => {


	const {loading,conversations} = useGetConversations();
	
	// useEffect(()=>{
	// 	if (token) {
	// 		getAllUsers();
	// 	}	  
	// },[token])
	if(loading){
		return <div className='mt-4 flex items-center justify-center'>
			<span className="loading loading-spinner loading-md"></span>
		</div> 
	}
  return (
    <div className='flex flex-col max-h-[600px] py-2 overflow-scroll gap-1'>
		{conversations.map((item,index)=>{
			return <Person key = {index} item = {item} lastIndex={index === conversations.length - 1? false:true}/> 
		  })}
    </div>
  )
}

export default SearchResults