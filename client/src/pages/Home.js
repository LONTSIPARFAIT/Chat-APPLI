import React from 'react'
import { Outlet } from 'react-router-dom'
                                    
const Home = () => {
  return (
    <div>
      Home
        {/* composant de message */}
      <section>
        <Outlet />
        {/* <MessagePage /> */}
      </section>
    </div>
  )
}

export default Home
