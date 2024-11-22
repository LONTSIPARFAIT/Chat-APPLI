import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';

const CheckEmailPage = () => {
    const [data, setData] = useState({
      email: "",
    });
    
    const navigate = useNavigate();
  
    const handleOnchange = (e) => {
      const { name, value } = e.target;
  
      setData((preve) => ({
        ...preve,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted"); // Vérifiez si la fonction est appelée

      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
  
      try {
        const response = await axios.post(URL, data);
        toast.success(response.data.message);
  
        if (response.data.success) {
          setData({
            email: "",
          });
  
          navigate('/password', {
            state: response?.data?.data,
          });
        }
  
        console.log("response", response);
        
      } catch (error) {
        toast.error(error?.response?.data?.message || "Une erreur s'est produite"); // Ajout d'un message par défaut
        console.log('error', error); // Ajoutez ceci pour voir l'erreur complète
      }
  
      console.log(data);
    };

    return (
      <div className="mt-5">
        <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
          <div className="w-fit mx-auto mb-2">PROFIL</div>
          <h3 className="font-bold">Bienvenue sur Perfect-App</h3>

          <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Entrer votre email"
                className="bg-slate-100 px-3 py-1 rounded focus:outline-primary"
                value={data.email}
                onChange={handleOnchange}
                required
              />
            </div>

            <button 
              type="submit" // Ajouté pour être explicite
              className="bg-primary text-lg px-4 py-1 hover:bg-secondary leading-relaxed tracking-wide rounded mt-2 font-bold text-white"
            >
              Suivant
            </button>
          </form>
          <p className="my-3 text-center">
            Nouveau utilisateur? <Link to={"/register"} className="hover:text-primary font-semibold">S' Inscrire</Link>
          </p>
        </div>
      </div>
    );
};

export default CheckEmailPage;