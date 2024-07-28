import {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'
export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
	
	const [authUser, setAuthUser] = useState(localStorage.getItem("token") || null);
	const [user, setUser] = useState({});
	const token = localStorage.getItem("token")
	const url = "http://localhost:4000";
	
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

	return <AuthContext.Provider value={{ authUser, setAuthUser,user,url}}>{children}</AuthContext.Provider>;
};