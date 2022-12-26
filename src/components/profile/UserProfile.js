import { useReducer , useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Photos from './Photos'
import { getUserByUsername , getPhotoByUsername} from '../../services/firebase'


export default function Profile({user}){
    
    const reducer = (state , newState) => ({...state , ...newState})
    const initialState = {
        profile:{},
        photosCollection:[],
        followerCount:0
    }

    const [{Profile , photosCollection , followerCount} , dispatch] = useReducer(reducer , initialState)

    useEffect(() => {
    async function getProfileInfoAndPhotos(){
        const photos = await getPhotoByUsername(user?.userId)

        dispatch({ Profile:user , photosCollection:photos , followerCount:user.followers.length})
    }

    if(user.username){
        getProfileInfoAndPhotos()
    }

    }, [user.username])
    
    return (
        <>
        <Header photosCount={photosCollection ? photosCollection.length : 0 }
        profile={Profile ? Profile : {}}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        username={user.username}
        />
        <Photos Photos={photosCollection}/>

        </>
        )
}

