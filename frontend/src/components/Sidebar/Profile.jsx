import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext';
import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom'


const Profile = ({showProfile,setShowProfile}) => {
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

		<div onclick = {(showProfile)=>{setShowProfile(!showProfile)}} className='flex justify-start items-end max-[640px]:flex-col'>
        <div onClick={()=>{setShowProfile(!showProfile)}} className='flex gap-2 items-center p-2 py-1 cursor-pointer'>
          <div className='w-12 rounded-full'>
              <img className='rounded-full'src={url+'/images/'+user.image} alt={user.fullName}/>
          </div>
        <p className='ml-1 text-gray-200 font-semibold max-[640px]:text-sm'>Hello, {user.fullName}</p>
        </div>
		<div className='flex gap-2  max-[640px]:flex-col'>
			<LogoutButton />
			<NavLink to = '/users'><button className="btn btn-outline btn-info shadow-[0px_0px_11px_1px_#2b6cb0]">Add Friends</button></NavLink>
		</div>
   	 </div>
  )
}

export default Profile