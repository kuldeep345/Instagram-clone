import { useState , useEffect , useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserId , getPhotos } from '../services/firebase'

export default function usePhotos() {
    const [photos , setPhotos] = useState(null)
    const { user:{ uid: userId = '' } } = useContext(UserContext)

    useEffect(() => {
        async function getTimeLinePhotos() {
            const response = await getUserByUserId(userId)
            const following = response[0].following

            let followedUserPhotos = [];

            if(following.length > 0){
                followedUserPhotos = await getPhotos(userId , following) 
            }

            followedUserPhotos.sort((a,b)=> b.dateCreated - a.dateCreated)

            setPhotos(followedUserPhotos)            
        }

        if(userId){
            getTimeLinePhotos();
        }

    }, [])
    
    return {photos}
}