import { useState , useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../../context/firebase'
import UserContext from '../../../context/user'
import { handleLikes } from '../../../services/firebase'
import {AiOutlineHeart , AiFillHeart} from 'react-icons/ai'
import {BsChatDots} from 'react-icons/bs'
import useAuthStore from '../../../store'


const Actions = ({ docId , totalLikes , likedPhoto, handleFocus}) => {
    const {  userProfile }  = useAuthStore()

    const [toggleLiked , setToggleLiked] = useState(likedPhoto)

    const [ likes , setLikes] = useState(totalLikes.length)

   
    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked)

        const response = await handleLikes(userProfile?.userId , docId , toggleLiked)

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    }

  return (
    <>
    <div className='flex justify-between p-4'>
        <div className="flex gap-4">
           {toggleLiked ? <AiFillHeart fontSize='28px' onClick={handleToggleLiked} onKeyDown={(event) => {
            if(event.key === 'Enter'){
                handleToggleLiked()
            }
           }}  color="red"/> : <AiOutlineHeart fontSize='28px'  onKeyDown={(event) => {
            if(event.key === 'Enter'){
                handleToggleLiked()
            }
           }} onClick={handleToggleLiked}/>}

           <BsChatDots fontSize='24px' onClick={handleFocus} onKeyDown={(e)=>{
            if(e.key === 'Enter'){
                handleFocus()
            }
           }}/>
           
        </div>
    </div>
      <div className="p-4 py-0">
      <p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
      </div>

      </>
  )
}

Actions.propTypes = {
    docId:PropTypes.string.isRequired,
    totalLikes:PropTypes.number.isRequired,
    likedPhoto:PropTypes.bool.isRequired,
    handleFocus:PropTypes.func.isRequired
}

export default Actions