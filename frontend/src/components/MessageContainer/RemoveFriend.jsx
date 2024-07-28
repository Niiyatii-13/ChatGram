import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext'

const RemoveFriend = ({selectedConversation}) => {
    const {url} = useAuthContext();
    const token = localStorage.getItem("token")

    const removeFriend = async () => {
        try {
            const response = await axios({
                method:"get",
                url:url+`/api/user/removeFriend/${selectedConversation._id}`,
                headers:{token},
            })
            console.log(response.data.success);
            if(response.data.success){
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
  return (
    <div className="mx-8 flex justify-start">
    <button onClick = {removeFriend} className="btn text-sm h-2 mt-auto btn-outline btn-error shadow-[0px_0px_11px_1px_#c53030]">Remove from friend list</button>
  </div>
  )
}

export default RemoveFriend