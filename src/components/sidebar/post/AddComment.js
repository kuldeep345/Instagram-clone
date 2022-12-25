import { useState , useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../../context/firebase'
import userContext from '../../../context/user'
import { handleComments } from '../../../services/firebase'
import useUser from '../../../hooks/use-user'

const AddComment = ({docId , comments , setComments , commentInput}) => {

    const [ comment , setComment ] = useState('');
    
    const { user} = useUser()

    const handleSubmitComment = async(e) => {
        e.preventDefault()
        setComments([{displayName:user?.username , comment }, ...comments])
        setComment('')
        await handleComments(docId,user?.username, comment)
    
    }

  return <div className='border-t border-gray-200'>
            <form
            className='flex justify-between pl-0 pr-5'
            method='POST'
            onSubmit={(e) => comment.length >=1 ? handleSubmitComment(e) : e.preventDefault() } 
            >
                <input 
                aria-label='Add a comment'
                className='text-sm text-gray-500 w-full mr-3 py-5 px-4 focus:outline-none'
                type="text"
                name='addComment'
                placeholder='Add a comment...'
                value={comment}
                onChange={(e)=> setComment(e.target.value)}
                ref={commentInput}
                />
                <button
                className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
                type='button'
                disabled={comment.length < 1}
                onClick={handleSubmitComment}
                >
                    Post
                </button>
           </form>
        </div>
}

AddComment.propTypes = {
    docId:PropTypes.string.isRequired,
    comments:PropTypes.array.isRequired,
    setComments:PropTypes.func.isRequired,
    commentInput:PropTypes.object
}

export default AddComment