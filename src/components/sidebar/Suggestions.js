import React, { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'

const Suggestions = ({userId,following}) => {
  const [ profiles , setProfiles ] = useState(null)

  const filteredProfile = profiles?.filter((profile)=> profile.userId !== userId && !following.includes(profile.userId))

  console.log(filteredProfile)

  useEffect(() => {
    async function suggestedProfiles(){
      const response = await getSuggestedProfiles(userId , following)
      setProfiles(response)
    }
    suggestedProfiles();
  }, [userId])
  

  return (
    !profiles ? (
      <Skeleton count={1} height={150} className="mt-5"/>
    ) : profiles.length > 0 ? (
      <div className='rounded flex flex-col'>
        <div className="text-sm flex items-center justify-between mb-2">
        <p className="font-bold text-gray-500">Suggestions for you</p>
        </div>
      </div>
    ) : null
  )
}

Suggestions.propTypes = {
  userId:PropTypes.string
}

export default Suggestions