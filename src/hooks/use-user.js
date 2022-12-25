import { useState , useEffect , useContext } from 'react'
import userContext from '../context/user'
import { getUserByUserId } from '../services/firebase'
import useAuthStore from '../store'

export default function useUser(){
    const [ activeUser , setActiveUser ] = useState({})
    const { userProfile } = useAuthStore()

    useEffect(() => {
     async function getUserObjUserId(){
        const response = await getUserByUserId(userProfile?.userId)
        setActiveUser(response)
     }

     if(userProfile?.userId){
        getUserObjUserId()
    }

    }, [userProfile?.userId])
    
    return { user : activeUser[0] }
}