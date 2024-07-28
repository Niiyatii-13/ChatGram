import Login from "./pages/Login/Login.jsx"
import './App.css'
import Signup from './pages/Signup/Signup.jsx'
import Home from './pages/Home/Home.jsx'
import {Route,Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import SearchBox from "./components/Users/SearchBox.jsx"


function App() {

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/signup' element = {<Signup/>}/>
          <Route path = '/users' element = {<SearchBox/>}/>
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
