import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  IoClose } from 'react-icons/io5';

const RegisterPage = () => {
  const [date,setDate] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")

  const handleOnchange = (e)=>{
    const { name,value } = e.target

    setDate((preve)=>{
      return {
        ...preve,
        [name] : value,
      }
    })
  }
  const handleUploadPhoto = (e)=>{
    const file = e.target.files[0]
    setUploadPhoto(file);
  }
  const handheClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null);
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    e.stopPropagation()
  }

  // console.log('uploadPhoto',uploadPhoto);
  
    return (
      <div className="mt-5"> 
        <div className="bg-white w-full max-w-sm  mx-2 rounded overflow-hidden p-4 ">
          <h3>Bienvenue sur Perfect-App</h3>

          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Nom : </label>
              <input type="text" 
                id="name" name="name" 
                placeholder="Entrer votre nom" 
                className="bg-slate-100 px-3 py-1 rounded focus:outline-primary"
                value={date.name}
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
                value={date.email}
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
                value={date.password}
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
          <p>Vous avez déjà un compte? <Link to={"/email"} className="hover.">Se Connecter</Link></p>
        </div>
      </div>
    )
}

export default RegisterPage;