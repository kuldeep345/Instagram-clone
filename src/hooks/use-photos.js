import { useEffect , useContext } from 'react'
import userContext from '../context/user'
import { getUserByUserId, getPhotos } from '../services/firebase'
import useAuthStore from '../store'


export default function usePhotos() {
        
   const { userProfile ,setPhotos} = useAuthStore()
   const {fetchPhotos} = useContext(userContext)
   
    useEffect(() => {
        async function getTimeLinePhotos() {
            const response = await getUserByUserId(userProfile?.userId)
            const following = response[0]?.following

            let followedUserPhotos = [];

            if(following.length > 0){
                followedUserPhotos = await getPhotos(userProfile?.userId , following) 
            }

            followedUserPhotos.sort((a,b)=> b.dateCreated - a.dateCreated)
           
            setPhotos(followedUserPhotos)            
        }

        if(userProfile?.userId){
            getTimeLinePhotos();
        }

    }, [fetchPhotos , userProfile?.userId, setPhotos])
    
}