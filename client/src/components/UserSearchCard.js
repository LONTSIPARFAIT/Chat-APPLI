import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = (user,) => {
  return (
    <Link to={'/'+user?._id} onClick={onclose} className='flex items-center gap-3 p-2 border lg:p-4 border-transparent border-t-slate-200 hover:border hover:border-primary rounded cursor-pointer '>
      <div>
        <Avatar
          width={50}
          height={50}
          name={user?.name}
          userId={user?._id}
        />
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1 '>
          {user?.name}
        </div>
        <p className='text-sm text-ellipsis line-clamp-1 '> {user?.email} </p>
      </div>
      
      {/* <div></div> */}
    </Link>
  )
}

export default UserSearchCard
