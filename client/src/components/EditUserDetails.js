import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlite";

const EditUserDetails = ({ onclose, user }) => { // Corrigé : destructuration correcte des props
  const [data, setData] = useState({
    name: user?.user,
    profile_pic: user?.profile_pic,
  });

  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((preve) => ({
      ...preve,
      ...user,
    }));
  }, [user]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);

    setData((preve) => ({
      ...preve,
      profile_pic: uploadPhoto?.url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;

      const response = await axios.post(URL, data, { withCredentials: true });

      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onclose(); // Assurez-vous que c'est une fonction
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold text-center">Details du profile</h2>
        <p className="text-sm text-center">Editer le profile</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              name="name" // Corrigé : le nom du champ doit correspondre à 'data.name'
              id="name"
              value={data.name}
              onChange={handleOnchange}
              className="w-full py-1 px-2 focus:outline-primary border rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Photo de Profile</div>
            <div className="my-1 flex items-center gap-4 ">
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <label htmlFor="profile_pic">
                <button onClick={handleOpenUploadPhoto} className="font-semibold">Changer de Photo</button>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>

          <Divider />
          <div className="flex gap-3 w-fit ml-auto">
            <button 
              type="button" // Corrigé : ajouté pour éviter la soumission du formulaire
              onClick={onclose} 
              className="border-primary border px-4 text-primary py-1 rounded hover:text-white hover:bg-primary"
            >Cancel</button>
            <button 
              type="submit" // Corrigé : utilisé pour soumettre le formulaire
              className="border-primary bg-primary border px-4 text-white py-1 rounded hover:bg-secondary"
            >Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);