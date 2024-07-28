import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useAuthContext} from '../context/AuthContext.jsx'


const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
    const {url} = useAuthContext()
    const token = localStorage.getItem("token")
	useEffect(() => {
        
		const getConversations = async () => {
			setLoading(true);
			try {
				const response = await axios({
                    method:"get",
                    url:url+`/api/users/getUsers`,
                    headers:{token},
                })
                
				setConversations(response.data.filteredUsers);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
