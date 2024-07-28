import React, { useEffect ,useState,useRef} from 'react'
import Message from './Message'
import MessageSkeleton from '../../skeleton/MessageSkeleton.jsx'
import useGetMessages from '../../hooks/useGetMessages.js'
import useListenMessages from '../../hooks/useListenMessage.js'


const Messages = () => {
  const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);


  return (
    <div className='px-4 flex-1 overflow-auto rounded-3xl border-zinc-800 bg-gradient-to-r from-slate-900 to-slate-800 border-1 m-2 mb-1 p-2'>
      {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
        {!loading && messages.length === 0 && (
          <p className='text-center text-white'>Send a message to start the conversation</p>
        )}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
     
    </div>
  )
}

export default Messages