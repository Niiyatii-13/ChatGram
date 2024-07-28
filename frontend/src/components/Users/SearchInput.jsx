import {React,useState} from 'react'
import toast from "react-hot-toast";
import axios from 'axios'
import { IoSearchSharp } from "react-icons/io5";
import useConversations from '../../hooks/useGetConversations'
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {


  	const [search, setSearch] = useState("");
	const {conversations} = useGetConversations();
	const url = 'http://localhost:4000';
	const token = localStorage.getItem("token")

  const handleSubmit = async (e) => {
		e.preventDefault();
    	if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			const response = await axios({
				method:"get",
				url:url+`/api/user/addToFriend/${conversation._id}`,
				headers:{token},
			})
			toast.success(response.data.message)
			setSearch("");
		} else toast.error("No such user found!");

	};

  return (

    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered h-14 mb-2 rounded-full w-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-blue-900  text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
	</form>
     
   
  )
}

export default SearchInput