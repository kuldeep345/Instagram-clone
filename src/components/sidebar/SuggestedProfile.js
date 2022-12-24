import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { updateLoggedInUserFollowing , updateFollowedUserFollowers } from '../../services/firebase'

const SuggestedProfile = ({userDocId,username,profileId,userId,loggedInUserDocId}) => {
    const [followed , setFollowed] = useState(false)

    async function handleFollowUser(){
      setFollowed(true);

      await updateLoggedInUserFollowing(loggedInUserDocId , profileId , false)

      await updateFollowedUserFollowers(userDocId , userId , false)
    }

  return  !followed ? (
    <div className='flex flex-row items-center justify-between'>
        <div className="flex items-center justify-between">
          <img
          className='rounded-full w-8 flex mr-3'
          src={`/images/avatars/${username}.jpg`}
          alt=""
          />
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