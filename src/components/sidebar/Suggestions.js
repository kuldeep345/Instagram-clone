import React, { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './SuggestedProfile'

const Suggestions = ({userId,following,loggedInUserDocId}) => {
  const [ profiles , setProfiles ] = useState(null)

  useEffect(() => {
    async function suggestedProfiles(){
      const response = await getSuggestedProfiles(userId , following)
      setProfiles(response)
    }
    suggestedProfiles();
    // eslint-disable-next-line
  }, [userId])
  

  return (
    !profiles ? (
      <Skeleton count={1} height={150} className="mt-5"/>
    ) : profiles.length > 0 ? (
      <div className='rounded flex flex-col'>
        <div className="text-sm flex items-center justify-between mb-2">
        <p className="font-bold text-gray-500">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
          key={profile.docId}
          userDocId={profile.docId}
          username={profile.username}
          profileId={profile.userId}
          userId={userId}
          loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
      </div>
    ) : null
  )
}

Suggestions.propTypes = {
  userId:PropTypes.string
}

export default Suggestions