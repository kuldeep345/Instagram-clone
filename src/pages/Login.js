import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useAuthStore from'../store'

const Login = () => {
  const { setUser , userProfile } = useAuthStore()
  const navigate = useNavigate()

  const [ email , setEmail ] = useState('')
  const [password , setPassword] = useState('')

  const [error, setError] = useState('')
  const isInvalid = password === '' || email === '';

  const handleLogin = async(e)=>{
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user:{displayName,email,uid}}) => {
        setUser({displayName , email,userId:uid})
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        setEmail('')
        setPassword('')
        setError('No User Found')
      });

  };

  useEffect(() => {
    document.title = 'Login - Instagram'
    if(userProfile !== null){
      navigate('/')
    }
    
  })


  return (
   !userProfile &&  <>
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className="hidden lg:flex lg:w-3/5">
        <img src='/images/iphone-with-profile.jpg' alt="iPhone with Instagram app"/>
      </div>
      <div className='flex flex-col w-4/5 lg:w-2/5 mx-auto lg:mx-auto'>
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
              <img src='/images/logo.png' alt='Instagram' className='mt-2 m-6/12 mb-4' />
          </h1>
          {error &&  <p className='mb-4 text-xs text-red-500'>{error}</p>}

          <form onSubmit={handleLogin} method="POST">
              <input 
              type="text" 
              value={email}
              placeholder='Email address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none'
              onChange={(e)=>setEmail(e.target.value)}
              />
              <input 
              type="password" 
              value={password}
              placeholder='Password'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none'
              onChange={(e)=>setPassword(e.target.value)}
              />
              <button disabled={isInvalid} type="submit" className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>Log In</button>
          </form>
      </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">Don't have an account{` `}
            <Link to='/signup' className="font-bold text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        </div>
    </div>
    </>
  )
}

export default Login