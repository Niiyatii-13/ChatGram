import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";


const useGetMessages = ({id}) => {
	const [loading, setLoading] = useState(false);

	const [message,setMessage] = useState([]);
	const token = localStorage.getItem("token")
	const url = 'http://localhost:4000'
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true)
    
			try {
			const response = await axios({
				method:"get",
				url:url+`/api/message/${id}`,
				headers:{token},
			})
			if(response.data.success){
				setMessage(response.data.messages[messages.length-1]);
			}
			} catch (error) {
				toast.error(error.message);
			}finally{ setLoading(false)}
    
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;