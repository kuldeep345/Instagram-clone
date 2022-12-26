import { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import useAuthStore from '../../store'

const User = ({ username , fullName}) => {

  const { userProfile } = useAuthStore()

  const [image, setimage] = useState(true)

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
  testImage(`http://localhost:3000/images/avatars/${userProfile?.displayName}.jpg`).then(
  function fulfilled(img) {
      setimage(false)
  },
  function rejected() {
      setimage(true)
  }
);
}, [userProfile?.displayName])



  return (
     !username || !fullName ? (
      <Skeleton count={1} height={61} />
     ) :(
      <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
        <div className='flex items-center justify-between col-span-1'>
         {image ? <img 
          className='rounded-full w-14 h-14 mr-3'
          src={`/images/avatars/default.png`}
          alt=""
          /> : <img 
          className='rounded-full w-14 h-14 mr-3'
          src={`/images/avatars/${username}.jpg`}
          alt=""
          />}
        </div>
        <div className='col-span-3'>
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
      </Link>
     )
  )
}

User.propTypes = {
  username:PropTypes.string.isRequired,
  fullName:PropTypes.string.isRequired
}

export default User