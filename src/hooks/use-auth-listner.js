import { useState , useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FirebaseContext from '../context/firebase'

export default function useAuthListener() {
    const [ user , setUser ] = useState(JSON.parse(localStorage.getItem('authUser')));

    const { firebase } = useContext(FirebaseContext)
    
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            localStorage.setItem('authUser' , JSON.stringify(user))
          } else {
            localStorage.removeItem('authUser')
            setUser(null)
          }
        });
    }, [firebase])
    
    return { user }
}