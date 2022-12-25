import { useState , useEffect } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../components/Header'
import UserProfile from '../components/profile/UserProfile'

const Profile = () => {
    const { username } = useParams()
    const [ user , setUser ] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
     async function checkUserExists(){
        const user = await getUserByUsername(username)
        if(user.length > 0){
            setUser(user[0])
        }
        else{
            navigate(ROUTES.NOT_FOUND)
        }
     }

     if(username){
         checkUserExists()
     }
    }, [username , navigate])
    

  return user ? (
    <div className='bg-gray-100'>
        <Header/>
        <div className='mx-auto max-w-screen-lg'>
            <UserProfile user={user}/>
        </div>
    </div>
  ) : null
}

export default Profile