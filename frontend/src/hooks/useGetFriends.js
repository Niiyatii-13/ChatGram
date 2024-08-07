import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useAuthContext} from '../context/AuthContext.jsx' 

const useGetFriends = () => {
	const [loading, setLoading] = useState(false);
	const [friends, setFriends] = useState([]);
    const {url} = useAuthContext()
    const token = localStorage.getItem("token")
	useEffect(() => {
        
		const getFriends = async () => {
			setLoading(true);
			try {
				const response = await axios({
                    method:"get",
                    url:url+`/api/users/getFriends`,
                    headers:{token},
                })
                
				setFriends(response.data.friends);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getFriends();
	}, []);

	return { loading, friends };
};
export default useGetFriends;
