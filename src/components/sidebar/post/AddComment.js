import { useState , useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../../context/firebase'
import userContext from '../../../context/user'

const AddComment = ({docId , comments , setComments , commentInput}) => {

    const [ comment , setComment ] = useState('')
    
    const { user : { displayName }} = useContext(userContext)

    const handleSubmitComment = (e) => {
        e.preventDefault()
        return null;
    }

  return null
}

AddComment.propTypes = {
    docId:PropTypes.string.isRequired,
    comments:PropTypes.array.isRequired,
    setComments:PropTypes.func.isRequired,
    commentInput:PropTypes.object
}

export default AddComment