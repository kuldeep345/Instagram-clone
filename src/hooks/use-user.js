import { useState , useEffect , useContext } from 'react'
import userContext from '../context/user'
import { getUserByUserId } from '../services/firebase'

export default function useUser(){
    const [ activeUser , setActiveUser ] = useState({})
    const { user } = useContext(userContext)

    useEffect(() => {
     async function getUserObjUserId(){
        const response = await getUserByUserId(user.uid)
        setActiveUser(response)
     }

     if(user?.uid){
        getUserObjUserId()
    }

    }, [user])
    
    return { user : activeUser[0] }
}