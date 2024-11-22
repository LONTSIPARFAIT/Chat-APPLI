import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlite";
// import { PiUserCircle } from "react-icons/pi "

const CheckPasswordPage = () => {

  const [data,setData] = useState({
    password : "",
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  console.log("location",location.state);

  useEffect(()=>{
    if (!location?.state?.name) {
      navigate('/email')
    }
  },[])   

  const handleOnchange = (e)=>{
    const { name,value } = e.target

    setData((preve)=>{
      return {
        ...preve,
        [name] : value,
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`



    try {
      const response = await axios.post({
        method : 'post',
        url : URL,
        data : {
          userId : location?.state?._id,
          password : data.password,
        },
        withCredentials : true 
      }
      
     )
      toast.success(response.data.message)

      if (response.data.success) {

        // dispatch(setUser(response.data.data))
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)

        setData({
          userId : location?.state?._id,
          password : data.password,
        })

        navigate('/')
      }

      console.log("response",response);
      
    } catch (error) {
      toast.error(error?.response?.data?.message) 
      console.log('error',error);
      
    }

    console.log(data);
  }

  return (
    <div className="mt-5">
    <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
      <div className="w-fit mx-auto mb-2 flex flex-col items-center justify-center">
        {/* <PiUserCircle size={80}/> */}
        <Avatar 
          width={70}
          height = {70}
          name = {location?.state?.name}
          imageUrl = {location?.state?.profile_pic}
          />
          <h3 className="font-semibold text-lg mt-1">{location?.state?.name}</h3>
      </div>
      <h3 className="font-bold">Bienvenue sur Perfect-App</h3>

      <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
              <label htmlFor="password">Mot de Passe : </label>
              <input type="password" 
                id="password" name="password"
                placeholder="Entrer votre Mot de passe" 
                className="bg-slate-100 px-3 py-1 rounded focus:outline-primary"
                value={data.password}
                onChange={handleOnchange}
                required
              />
            </div>

        <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary leading-relaxed tracking-wide rounded mt-2 font-bold text-white">
          Se Connecter
        </button>
      </form>
      <p className="my-3 text-center"><Link to={"/forgot-password"} className="hover:text-primary font-semibold">Mot de Passe Oublier ?</Link></p>
    </div>
    </div>
  )
}

export default CheckPasswordPage
