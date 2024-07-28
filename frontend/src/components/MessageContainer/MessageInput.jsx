import {React,useState} from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";

const MessageInput = () => {
  const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
  const [emoji,setEmoji] = useState(false);
  
  const changeEmoji = ()=>{
    setEmoji(!emoji) 
    console.log(emoji);
    console.log("clicked");
  }

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};
  return (
    <form className='px-4 my-3 ' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder='Type a message' className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'/>
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput