import useUser from "../../hooks/use-user"
import User from "./User."
import Suggestions from './Suggestions'
import useAuthStore from "../../store"


const Sidebar = () => {

  const {user} = useUser() 

  return (
    <div className="p-4">
     <User fullName={user?.fullName} username={user?.username} displayName={user?.displayName}/>
      <Suggestions userId={user?.userId} following={user?.following} loggedInUserDocId={user?.docId}/> 
    </div>
  )
}

export default Sidebar