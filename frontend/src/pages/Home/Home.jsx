import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import MessageContainer from '../../components/MessageContainer/MessageContainer.jsx'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      navigate('/signup')
    }
  },[])
  return (
    
    <>
    <div className = "w-full bg-gradient-to-r from-slate-900 to-slate-700 flex md:flex-row h-screen">
        <Sidebar />
			  <MessageContainer />
    </div>
    </>
  )
}

export default Home