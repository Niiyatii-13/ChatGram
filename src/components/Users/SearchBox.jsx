import React from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import { NavLink } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

const SearchBox = () => {
  return (
    <div className='w-full h-full p-12 bg-gradient-to-r from-slate-800 to-slate-700 md:flex-row sm:h-[780px] md:h-[780px]'>
        <div className = 'overflow-auto'>
          <SearchInput/>
          <SearchResults/>
        </div>
        
        <NavLink to = '/'>
          <div className='font-bold cursor-pointer mt-4 ml-4 mb-6' >
            <IoMdArrowRoundBack className='text-2xl mt-auto'/>
          </div>
        </NavLink>
    </div>
  )
}

export default SearchBox