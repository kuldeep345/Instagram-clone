import useUser from "../../hooks/use-user"
import User from "./User."
import Suggestions from './Suggestions'

const Sidebar = () => {

  const {user} = useUser() 

  return (
    <div className="p-4 hidden lg:block">
     <User fullName={user?.fullName} username={user?.username} displayName={user?.displayName}/>
      <Suggestions userId={user?.userId} following={user?.following} loggedInUserDocId={user?.docId}/> 
    </div>
  )
}

export default Sidebar