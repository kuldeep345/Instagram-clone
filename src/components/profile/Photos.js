import PropTypes from 'prop-types'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillChatDotsFill} from 'react-icons/bs'

const Photos = ({Photos}) => {

  return (
    <div className='h-16 border-t border-gray-200 mt-12 pt-4 min-h-screen'>
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {
          Photos.length < 1 ? (
            <>
            <Skeleton count={12} width={320} height={400}/>
            </>
          ) : Photos?.length >= 1 ? (
            Photos?.map((photo)=>(
              <div key={photo.docId} className="relative group">
                <img src={photo.imageSrc} alt={photo.caption} className='group-hover:brightness-[0.6]'/>
                <div className='absolute bottom-0 left-0 z-10 w-full justify-evenly items-center h-full hidden group-hover:flex'>
                  <p className="flex items-center text-white font-bold">
                    <AiFillHeart/>
                    <span className='text-white text-xl'>{photo.likes?.length}</span>
                  </p>
                  <p className="flex items-center text-white font-bold">
                    <BsFillChatDotsFill/>
                    <span className='text-white text-xl'>{photo.comments?.length}</span>
                  </p>
                </div>
              </div>
            ))
          ) : null
        }
      </div>
      {!Photos || (Photos.length === 0 && <p className='text-center text-2xl'>No Posts yet</p>)}
    </div>
  )
}

Photos.propTypes = {
  Photos: PropTypes.array.isRequired
}

export default Photos