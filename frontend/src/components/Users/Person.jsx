import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAuthContext } from '../../context/AuthContext';



const Person = ({lastIndex,item}) => {
  
  const token = localStorage.getItem("token")
  const {url} = useAuthContext()
  const image = item.image;

  const handleClick = async (e) => {
		e.preventDefault();
    const response = await axios({
      method:"get",
      url:url+`/api/user/putToFriend/${item._id}`,
      headers:{token},
    })
    if(response.data.success){
     toast.success(response.data.message)
    }
    else{
      toast.error("Error occured")
    }
	};
  
  return (
    <>
    <div className={`flex rounded-full shadow-2xl p-2 h-24 gap-2 items-center  hover:bg-gray-800 py-1 cursor-pointer duration-200 hover:drop-shadow-lg`}>
        <div className={`avatar`}>
 			    <div className='w-20 rounded-full '>
 						<img src={url+'/images/'+item.image} alt='user'/>
 					</div>
 			  </div>
            <div className='flex flex-col justify-between'>
                    <p className='text-2xl ml-2 text-gray-100 '>Name: <span className='font-bold text-gray-200'>{item.fullName}</span></p>
                    <p className='text-sm ml-2 text-gray-100 '>Username: <span className='font-bold text-gray-200'>{item.username}</span></p>
                    
            </div>
        <IoMdAddCircleOutline onClick = {handleClick}className= 'text-2xl hover:scale-150 duration-300 ml-auto mr-4 shadow-[0px_0px_11px_1px_#2b6cb0] rounded-full'/>
        </div>
      <div>
    </div>
    {!lastIndex ? <></>:<hr className="h-0.5 mb-1 border-t-0 bg-neutral-100 dark:bg-white/10" />}
    </>
        
  )
}

export default Person
