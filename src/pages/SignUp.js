import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import { createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import { doesUsernameExist } from '../services/firebase';
import { db } from '../lib/firebase';
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
    const navigate = useNavigate()

    const [ username , setUsername ] = useState('')
    const [ fullName , setFullName ] = useState('')
    const [ email , setEmail ] = useState('')
    const [password , setPassword] = useState('')
  
    const [error, setError] = useState('')
    const isInvalid = password === '' || email === '';
  
    const handleLogin = async(e)=>{
      e.preventDefault();

      const userNameExists = await doesUsernameExist(username)
        if(!userNameExists){
        
            const auth = getAuth();
          await createUserWithEmailAndPassword(auth, email, password)
              .then(async(userCredential) => {
               await updateProfile(userCredential.user, {
                    displayName: username
                  }).then(async(data) => {        
                    navigate('/')
                  }).catch((error) => {
                    console.log(error)
                  });
                  
                  await setDoc(doc(db, "users", userCredential.user.uid), {
                    userId:userCredential.user.uid,
                    username:username.toLowerCase(),
                    fullName,
                    emailAddress:email.toLowerCase(),
                    following:[],
                    followers:[],
                    dateCreated:Date.now()
                  })
            })
            .catch((error) => {
                console.log(error)
                setError('Sorry! Email already in use')
              });
              
     
        
        }
        else{
            setError('Sorry! username is already taken, please try another')
        }
    };
  
    useEffect(() => {
      document.title = 'SignUp - Instagram'
    }, [])

  return (
    <>
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className="flex w-3/5">
        <img src='/images/iphone-with-profile.jpg' alt="iPhone with Instagram app"/>
      </div>
      <div className='flex flex-col w-2/5'>
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
              <img src='/images/logo.png' alt='Instagram' className='mt-2 m-6/12 mb-4' />
          </h1>
          {error &&  <p className='mb-4 text-xs text-red-500'>{error}</p>}

          <form onSubmit={handleLogin} method="POST">
              <input 
              type="text" 
              value={username}
              placeholder='Username'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none'
              onChange={(e)=>setUsername(e.target.value)}
              />
              <input 
              type="text" 
              value={fullName}
              placeholder='Fullname'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none'
              onChange={(e)=>setFullName(e.target.value)}
              />
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
          <p className="text-sm">Have an account{` `}
            <Link to='/login' className="font-bold text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        </div>
    </div>
    </>
  )
}

export default SignUp