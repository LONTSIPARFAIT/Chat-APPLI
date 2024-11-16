import React from 'react'
import logo from '../assets/logo.png'

const AuthLayouts = ({children}) => {
  return (
    <>
      <header className='flex justify-center items-center py-1 h-20 shadow-md '>
        <img src={logo} alt='logo' height={100} width={200}/>
      </header>

      {children}

    </>
  )
}

export default AuthLayouts
