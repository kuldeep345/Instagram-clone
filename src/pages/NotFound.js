import React, { useEffect } from 'react'

const NotFound = () => {

    useEffect(() => {
      document.title = 'Not Found! - Instagram'
    }, [])
    

  return (
    <div className='bg-gray-200'>
        <div className='mx-auth max-w-screen'>
          <p className='text-center text-2xl'>Not Found!</p>
        </div>
    </div>
  )
}

export default NotFound