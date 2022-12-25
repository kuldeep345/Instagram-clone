import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/sidebar/Sidebar'
import Timeline from '../components/Timeline'
import useAuthStore from '../store'

const Dashboard = () => {
  const { userProfile } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Instagram'
  }, [])

 
  useEffect(() => {
    if (!userProfile) {
      navigate('/login')
    }
  }, [])

  return (
      <>
      <div className='bg-gray-100'>
        <Header />
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </>
  
  )
}

export default Dashboard