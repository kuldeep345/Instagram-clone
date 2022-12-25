import { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { isUserFollowingProfile } from '../../services/firebase'
import useUser from '../../hooks/use-user'

const Header = ({ photosCount, 
  profile,
   followerCount ,
    setFollowerCount
  }) => {

    const { user } = useUser()
  const [isFollowingProfile , setIsollowingProfile] = useState(false)

    const activeBtnFollow = user?.username && user?.username !== profile?.username
    console.log(isFollowingProfile)

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async()=>{
      const isFollowing = await isUserFollowingProfile(user?.username, profile.userId)
      setIsollowingProfile(isFollowing)
    }  

    if(user?.username && profile.userId){
      isLoggedInUserFollowingProfile();
    }

  }, [user?.username , profile.userId])
  
  const handleToggleFollow = ()=>{

  }
 
  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
      <div className='container flex justify-center'>
         {profile.username && (<img 
          className='rounded-full h-40 w-40 flex'
          alt={`${profile?.username} profile picture`}
          src={`/images/avatars/${profile?.username}.jpg`}
          />)
          }
      </div>
      <div className='flex items-center justify-center flex-col col-span-2'>
          <div className='container flex items-center'>
            <p className="text-2xl mr-4">{profile.username}</p>
            {activeBtnFollow && (
              <button
              className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'
              type='button'
              onClick={handleToggleFollow}
              >
                {isFollowingProfile ? 'Unfollow' : 'follow'}
              </button>
            )}
          </div>
      </div>
    </div>
  )
}

// {docId:profileDocId, userId:profileUserId , fullName , following = [] } 

Header.propTypes = {
  username: PropTypes.string.isRequired,
  photosCount: PropTypes.number.isRequired,
  profile:PropTypes.object.isRequired,
  followerCount:PropTypes.number.isRequired,
  setFollowerCount:PropTypes.func.isRequired,
  profile:PropTypes.shape({
    docId:PropTypes.string,
    userId:PropTypes.string,
    fullName:PropTypes.string,
    following:PropTypes.array
  }).isRequired
}


export default Header