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


export async function getUserByUserId(userId){
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const queryDocs = await getDocs(q)
    const user = queryDocs.docs.map((item) => ({
        ...item.data(),
        docId:item.id
    }))
    return user
}

export async function getSuggestedProfiles(userId, following) {
    if(userId && following){
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((user)=>({...user.data() , docId:user.id}))
        return users
    }
}