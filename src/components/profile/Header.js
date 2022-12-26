import { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { isUserFollowingProfile , toggleFollow} from '../../services/firebase'
import useUser from '../../hooks/use-user'

const Header = ({ photosCount, 
  profile,
   followerCount ,
   following = [],
   followers = [],
    setFollowerCount
  }) => {
   
    const { user } = useUser()
  const [isFollowingProfile , setIsFollowingProfile] = useState(false)

    const activeBtnFollow = user?.username && user?.username !== profile?.username
   
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async()=>{
      const isFollowing = await isUserFollowingProfile(user?.username, profile.userId)
      setIsFollowingProfile(isFollowing)
    }  

    if(user?.username && profile.userId){
      isLoggedInUserFollowingProfile();
    }

  }, [user?.username , profile.userId])
  
  const handleToggleFollow = async()=>{
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount -1 : followerCount + 1
    })
    await toggleFollow(isFollowingProfile , user.docId , profile?.docId , profile.userId , user.userId)
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
          <div className='container flex mt-4'>
              {followers === undefined || following === undefined ? (
                <Skeleton count={1} width={677} height={24}/>
              ) : (
                <>
                <p className='mr-10'>
                  <span className="font-bold">{photosCount}</span>{` `}
                  photos
                </p>
                <p className='mr-10'>
                  <span className='font-bold'>{followerCount}</span>
                  {` `} 
                  {followers===1 ? 'follower' : 'followers'}
                </p>
                <p className='mr-10'>
                  <span className='font-bold'>
                    {profile?.following?.length}{` `}
                    following
                  </span>
                </p>
                </>
              )}
          </div>
          <div className='container mt-4'>
                <p className='font-medium'>{!profile?.fullName ? <Skeleton count={1} height={24}/> : profile?.fullName}</p>
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
    followers:PropTypes.array,
    following:PropTypes.array
  }).isRequired
}


export default Header