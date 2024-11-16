import React from 'react'
import logo from '../assets/logo1.png'

const AuthLayouts = ({children}) => {
  return (
    <>
      <header className='flex justify-center items-center py-4 h-20 shadow-md bg-white'>
        <img src={logo} alt='logo'  height={100} width={75} className='rounded '/>
      </header>

      {children}

    </>
  )
}

export default AuthLayouts
