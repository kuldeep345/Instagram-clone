import { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { isUserFollowingProfile , toggleFollow} from '../../services/firebase'
import useUser from '../../hooks/use-user'
import useAuthStore from '../../store'

const Header = ({ photosCount, 
  profile,
   followerCount ,
   following = [],
   followers = [],
    setFollowerCount
  }) => {
   
    const { user } = useUser()
  const [isFollowingProfile , setIsFollowingProfile] = useState(false)
  const [image, setimage] = useState(true)


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
  testImage(`http://localhost:3000/images/avatars/${profile?.username}.jpg`).then(
  function fulfilled(img) {
      setimage(false)
  },
  function rejected() {
      setimage(true)
  }
);
}, [profile?.username])



 
 
  return (
    <div className='grid grid-cols-3 gap-4 lg:gap-0 justify-between mx-auto max-w-screen-lg px-2 lg:px-0'>
      <div className='container flex justify-center items-center col-span-3 lg:col-span-1'>
     
         {profile.username && ( image ? <img 
          className='rounded-full w-28 h-28 lg:h-40 lg:w-40 flex'
          alt={`${profile?.username} profile`}
          src={`/images/avatars/default.png`}
          /> : <img 
          className='rounded-full w-28 h-28 lg:h-40 lg:w-40 flex'
          alt={`${profile?.username} profile`}
          src={`/images/avatars/${profile?.username}.jpg`}
          />)
          }
      </div>
      <div className='flex items-center justify-center flex-col col-span-3 lg:col-span-2'>
          <div className='container flex items-center lg:justify-start'>
            <p className="text-2xl lg:mr-4 mx-aut lg:mx-0">{profile.username}</p>
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
          <div className='container flex gap-6 mt-2 lg:mt-4 justify-center lg:justify-start items-center'>
              {followers === undefined || following === undefined ? (
                <Skeleton count={1} width={677} height={24}/>
              ) : (
                <>
                <p className='lg:mr-10'>
                  <span className="font-bold">{photosCount}</span>{` `}
                  photos
                </p>
                <p className='lg:mr-10'>
                  <span className='font-bold'>{followerCount}</span>
                  {` `} 
                  {followers===1 ? 'follower' : 'followers'}
                </p>
                <p className='lg:mr-10'>
                  <span className='font-bold'>
                    {profile?.following?.length}{` `}
                    following
                  </span>
                </p>
                </>
              )}
          </div>
          <div className='container mt-2 lg:mt-4 flex items-center justify-center lg:justify-start'>
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