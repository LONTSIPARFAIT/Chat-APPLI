import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)

  console.log("params",params.userId);
  
  useEffect(()=>{
    if(socketConnection){
      socketConnection.emit('message-page',params.userId)
    }
  },[socketConnection])

  return (
    <div>
      MessagePage
    </div>
  )
}

export default MessagePage
