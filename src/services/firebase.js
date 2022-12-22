import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../lib/firebase'

export async function doesUsernameExist(username){
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    if(querySnapshot.docs.length){
        return true
    }
    else{
        return false
    }
}