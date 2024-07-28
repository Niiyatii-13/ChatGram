import React from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = () =>{

    localStorage.removeItem("token");
    navigate('/signup')

  }
  return (
    <div className="flex justify-start">
      <button onClick={logout}className="btn w-16 text-xs h-1 mt-auto btn-outline btn-error shadow-[0px_0px_11px_1px_#c53030]">Logout</button>
    </div>
  )
}

export default LogoutButton