import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Loading from './Loading'
import UserSearchCard from './UserSearchCard'
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoClose } from 'react-icons/io5'

const SearchUser = ({onclose}) => {
  const [searchUser,setSearchUser] = useState([])
  const [loading,setLoading] = useState(false)
  const [search,setSearch] = useState("")

  const handleSearchUser = async ()=>{
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`

    try {
      setLoading(true)
      const response = await axios.post(URL,{
        search : search,
      })
      setLoading(false)

      setSearchUser(response.data.data)

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(()=>{
    handleSearchUser()
  },[search])

  console.log("searchUser",searchUser);
  

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-slate-700 bg-opacity-40 p-2'>
      <div className='w-full max-w-lg mx-auto mt-10'>

        {/* input pour la recherche d'un user */}
        <div className='bg-white rounded h-14 overflow-hidden flex '>
           <input 
              type='text'
              placeholder="Rechercher le user avec le nom, l'Email....."
              className='w-full outline-none py-1 h-full px-4'
              onChange={(e)=>setSearch(e.target.value)}
              value={search}
            /> 
            <div className='flex items-center justify-center h-14 w-14 '>
              <IoSearchOutline 
                size={25}
              />
            </div>
        </div>

        {/** Display Search user */}
        <div className='bg-white mt-2 w-full p-4 rounded'>
          {/* Pas d'utilisateur touver */}
          {
            searchUser === 0 && !loading && (
              <p className='text-center text-slate-500'>Pas d'utilisateur touver !!</p>
            )
          }

          {
            loading && (
              <p className=''><Loading /></p>
            )
          }

          {
            searchUser !==0 && !loading && (
              searchUser.map((user,index)=>{
                return(
                  <UserSearchCard key={user._id} user={user} onclose={onclose} />
                )
              })
            )
          }

        </div>
        
      </div>

      <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white ' onClick={onclose}>
        <button>
          <IoClose size={25}/>
        </button>
      </div>

    </div>
  )
}

export default SearchUser
