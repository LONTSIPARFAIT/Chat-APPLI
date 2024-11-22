import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection } from '../redux/userSlite'
import MessagePage from '../components/MessagePage'
import Sidebar from '../components/Sidebar'
import logo from "../assets/logo1.png"
import io from "socket.io-client"
                                    
const Home = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log('user',user);
  
  const fetchUserDetails =  async()=>{
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`

      const response = await axios({
        url : URL,
        withCredentials : true
      })

      dispatch(response.data.data)

      if (response.data.data.logout) {
        dispatch(logout())
        navigate("/email")
      }

      console.log('info du user',response);
      
    } catch (error) {
      console.log('erreur',error);
      
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  // Socket connection
  useEffect(()=>{
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
      auth : {
        token : localStorage.getItem("token")
      }
    })

    socketConnection.on('onlineUser',(data)=>{
      dispatch(setOnlineUser(data))
      console.log(data);
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[])

  console.log("location",location);
  
  const basePath = location.pathname === '/'
  

  return (
    <div className='grid grid-cols-[300px,1fr] h-screen max-h-screen'>

      <section className={`bg-white ${!basePath && 'hidden lg:block'}`}>
        <Sidebar/>
      </section>
      
        {/* composant de message */}
      <section className={`${basePath && 'hidden'}`}>
        <Outlet />
      </section>

      <div className={`justify-center items-center flex-col gap-3 hidden ${!basePath ? 'hidden' : "lg:flex"} `}>
        <div >
          <img 
            src={logo} 
            width={200}
            alt='logo'
            className='rounded-2xl'
          />
        </div>
        <p className='text-lg mt-2 text-slate-600 font-semibold'>Commencer une discusssion !!!</p>
      </div>
      
    </div>
  )
}

export default Home
