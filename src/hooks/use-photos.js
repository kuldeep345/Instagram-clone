import { useState , useEffect , useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserId, getPhotos } from '../services/firebase'
import useAuthStore from '../store'

export default function usePhotos() {
        
   const { userProfile ,setPhotos} = useAuthStore()
   
    useEffect(() => {
        async function getTimeLinePhotos() {
            const response = await getUserByUserId(userProfile?.userId)
            const following = response[0].following

            let followedUserPhotos = [];

            if(following.length > 0){
                followedUserPhotos = await getPhotos(userProfile?.userId , following) 
            }

            followedUserPhotos.sort((a,b)=> b.dateCreated - a.dateCreated)
            console.log(followedUserPhotos)
            setPhotos(followedUserPhotos)            
        }

        if(userProfile?.userId){
            getTimeLinePhotos();
        }

    }, [])
    
}