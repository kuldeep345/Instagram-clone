import React, { useState , useContext , useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { updateLoggedInUserFollowing , updateFollowedUserFollowers } from '../../services/firebase'
import userContext from '../../context/user'

const SuggestedProfile = ({userDocId,username,profileId,userId,loggedInUserDocId}) => {
    const [followed , setFollowed] = useState(false)
    const { fetchPhotos ,  setfetchPhotos } = useContext(userContext)

     const [image, setimage] = useState(true)

    async function handleFollowUser(){
      setFollowed(true);
      setfetchPhotos(!fetchPhotos)
      await updateLoggedInUserFollowing(loggedInUserDocId , profileId , false)

      await updateFollowedUserFollowers(userDocId , userId , false)
    }

    
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
    testImage(`http://localhost:3000/images/avatars/${username}.jpg`).then(
    function fulfilled(img) {
        setimage(false)
    },
    function rejected() {
        setimage(true)
    }
  );
  }, [username])
  
  
  

  return  !followed ? (
    <div className='flex flex-row items-center justify-between'>
        <div className="flex items-center justify-between">
         {image ? <img
          className='rounded-full w-8 flex mr-3'
          src={`/images/avatars/default.png`}
          alt=""
          /> :<img
          className='rounded-full w-8 flex mr-3'
          src={`/images/avatars/${username}.jpg`}
          alt=""
          />}
          <Link to={`/p/${username}`}>
            <p className='font-bold text-sm'>{username}</p>
          </Link>
        </div>
        <button
        className='text-xs font-bold text-blue-500'
        type='button'
        onClick={()=>handleFollowUser()}
        >
          Follow
        </button>
    </div>
  ) : (
    <></>
  )
}

SuggestedProfile.propTypes = {
  userDocId:PropTypes.string.isRequired,
  username:PropTypes.string.isRequired,
  profileId:PropTypes.string.isRequired,
  userId:PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
}

export default SuggestedProfile