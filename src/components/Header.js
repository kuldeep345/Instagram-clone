import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store'

const Header = () => {

  const { userProfile , setUser } = useAuthStore()
  const [image, setimage] = useState(true)

  const auth = getAuth();
  const navigate = useNavigate()

  function testImage(url) {
    const imgPromise = new Promise(function imgPromise(resolve, reject) {
        const imgElement = new Image();
        imgElement.addEventListener('load', function imgOnLoad() {
            resolve(this);
        });
        imgElement.addEventListener('error', function imgOnError() {
            reject();
        })
        imgElement.src = url;
    });

    return imgPromise;
}

useEffect(() => {
  testImage(`http://localhost:3000/images/avatars/${userProfile?.displayName}.jpg`).then(
  function fulfilled(img) {
      setimage(false)
  },
  function rejected() {
      setimage(true)
  }
);
}, [userProfile?.displayName])




  return (
    <header className='h-16 bg-white border-b border-gray-200 mb-8 px-2 lg:px-0'>
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center cursor-pointer">
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD}>
                
                <img src='/images/logo.png' className='mt-2 w-6/12' alt=""/>
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center gap-6">
              {userProfile ? (
                <>
                <Link to={ROUTES.DASHBOARD}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                </Link>
                <button
                type='button'
                title='Sign Out'
                onClick={()=>{
                  signOut(auth).then(() => {
                    setUser(null)
                    navigate('/login')
                  })
                }}
                onKeyDown={(event) => {
                  if(event.key === 'Enter'){
                    signOut(auth).then(() => {
                      navigate('/login')
                    })
                  }
                }}
                >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>

                </button>
              <div className='flex items-center cursor-pointer'>
                    <Link to={`/p/${userProfile.displayName}`}>
                   {image ?  <img 
                      className='rounded-full h-8 w-8 flex'
                      src={`/images/avatars/default.png`}
                      alt={`${userProfile.displayName} profile`}
                      />  : <img 
                      className='rounded-full h-8 w-8 flex'
                      src={`/images/avatars/${userProfile.displayName.toLowerCase()}.jpg`}
                      alt={`${userProfile.displayName} profile`}
                      />  }
                    </Link>
              </div>
                </>
              ) : (
                <>
                <Link to={ROUTES.LOGIN} c>
                  <button type='button' className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'>Log In</button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button type='button' className='font-bold text-sm rounded text-blue-600 w-20 h-8'>Sign Up</button>
                </Link>
                </>
              )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header