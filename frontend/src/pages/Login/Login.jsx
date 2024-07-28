import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link ,useNavigate} from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username:"",
    password:"",
  });
  const {url} = useAuthContext();
  
  const onLogin = async(e) =>{
    e.preventDefault()
    const response = await axios.post(url + "/api/user/login",data);
    if(response.data.success){
      localStorage.setItem("token", response.data.token)    
      navigate('/')    
    }
    else{
      toast.error(response.data.message)
    }
  }
  return (
    <div className='flex items-center justify-center rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 mt-52 shadow-[0px_0px_15px_5px_#4a5568] max-[640px]:flex-col'>
      <div className='flex flex-col items-center justify-center min-w-96 h-full mt-auto mx-auto max-[640px]:items-center max-[640px]:justify-center max-[640px]:flex-row' >
        <div className='w-full flex flex-col p-6 items-center justify-center'>
          <h1 className='text-slate-100 text-3xl font-medium text-center'>
            Login
            <span className='bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent'> ChatGram</span>
          </h1>

          <form onSubmit={onLogin}>
            <div className='w-80 '>
              <label className='label p-2'>
                <span className="text-base text-slate-100 font-medium label-text">Username</span>
              </label>
              <input type="text" className='input input-bordered w-full max-w-xs' value = {data.username}  onChange = {(e) => setData({...data,username:e.target.value})} placeholder='Enter username'/>
            </div>
            <div>
              <label className='label p-2'>
                <span className="text-base text-slate-100 font-medium label-text">Password</span>
              </label>
              <input type="password"  className='input input-bordered w-full max-w-xs' value = {data.password} onChange = {(e) => setData({...data,password:e.target.value})} placeholder='Enter password'/>
            </div>
            <div className='max-[620px]:flex max-[620px]:items-center max-[620px]:justify-center'>
            <button className="btn btn-active btn-accent hover:bg-slate-700 hover:border-gray-600 text-slate-100 bg-gray-800 border-gray-400 w-48 mt-4 rounded-3xl text-base">Log In</button>
            </div>
          </form>
        </div>
      </div>
      
      <div className='flex flex-col items-center  justify-start mr-8 gap-4 max-[620px]:mb-10'>
        <p className = 'text-slate-100 text-3xl font-medium text-center'>New Here?</p>
        <p className='text-xs text-slate-100 font-medium label-text w-44'>Sign up to connect with people all over the world!</p>
        <Link to= "/signup" className=''>
          <button className="btn btn-active mt-2 btn-accent hover:bg-slate-700 hover:border-gray-600 text-slate-100 bg-gray-800 border-gray-400 w-48 rounded-3xl text-base">Sign Up</button>
        </Link>
      </div>
    </div>
    

  )
}

export default Login
