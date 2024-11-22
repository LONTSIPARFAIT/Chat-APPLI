import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  IoClose } from 'react-icons/io5';
import uploadFile from "../helpers/uploadFile";
import axios from "axios"
import { toast } from 'react-hot-toast'

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate()

  const handleOnchange = (e)=>{
    const { name,value } = e.target

    setData((preve)=>{
      return {
        ...preve,
        [name] : value,
      }
    })
  }
  const handleUploadPhoto = async (e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)
    // console.log('uploadPhoto',uploadPhoto);
    setUploadPhoto(file);

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })

  }

  const handheClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

    try {
      const response = await axios.post(URL,data)
      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          name : "",
          email : "",
          password : "",
          profile_pic : ""
        })

        navigate('/email')
      }

      console.log("response",response);
      
    } catch (error) {
      toast.error(error?.response?.data?.message) 
      console.log('error',error);
      
    }

    console.log(data);
  }

  // console.log('uploadPhoto',uploadPhoto);
  
  
    return (
      <div className="mt-5"> 
        <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
          <h3 className="text-2xl text-center font-bold mb-5">Bienvenue sur Perfect-App</h3>

          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Nom : </label>
              <input type="text" 
                id="name" name="name" 
                placeholder="Entrer votre nom" 
                className="bg-slate-100 px-3 py-1 rounded focus:outline-primary"
                value={data.name}
                onChange={handleOnchange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email : </label>
              <input type="email" 
                id="email" name="email" 
                placeholder="Entrer votre email" 
                className="bg-slate-100 px-3 py-1 rounded focus:outline-primary"
                value={data.email}
                onChange={handleOnchange}
                required
              />
            </div>
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
            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic">Photo de Profile : 
                <div className="h-14 bg-slate-100 flex justify-center items-center border rounded cursor-pointer hover:border-primary">
                  <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                    {
                      uploadPhoto?.name ? uploadPhoto?.name : "Télecharger une photo de profile"
                    }   
                  </p>
                  {
                    uploadPhoto?.name && (
                      <button className="text-lg ml-2 text-red-600" onClick={handheClearUploadPhoto}>
                        <IoClose/>
                      </button>
                    )
                  }
                </div>
              </label>
              <input type="file" 
                id="profile_pic" name="profile_pic"
                className="bg-slate-100 px-3 py-1 rounded focus:outline-primary hidden"
                onChange={handleUploadPhoto}
              />
            </div>

            <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary leading-relaxed tracking-wide rounded mt-2 font-bold text-white">
              S'inscrire
            </button>
          </form>
          <p className="my-3 text-center">Vous avez déjà un compte? <Link to={"/email"} className="hover:text-primary font-semibold">Se Connecter</Link></p>
        </div>
      </div>
    )
}

export default RegisterPage;