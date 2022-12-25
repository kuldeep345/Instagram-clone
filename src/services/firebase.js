import { collection, query, where, getDocs ,doc, updateDoc , arrayUnion , arrayRemove} from "firebase/firestore";
import { db, firebase } from '../lib/firebase'

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

export async function getUserByUsername(username){
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId:item.id
    }))

    return user.length > 0 ? user : false
}

export async function getPhotoByUsername(userId){
    const q = query(collection(db, "photos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId:item.id
    }))

    return user.length > 0 ? user : false
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
        const users = querySnapshot.docs.map((user)=>({...user.data() , docId:user.id})).filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
        return users
    }
}

export async function updateLoggedInUserFollowing(loggedInUserDocId , profileId , isFollowingProfile){
    const userFollowingRef = doc(db, "users", loggedInUserDocId);
    await updateDoc(userFollowingRef , {
      following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(userDocId , userId , isFollowingProfile){
    const userFollowingRef = doc(db, "users", userDocId);
    await updateDoc(userFollowingRef , {
      followers: isFollowingProfile ? arrayRemove(userId) : arrayUnion(userId)
    });
}

export async function getPhotos(userId , following){
    const q = query(collection(db, "photos"), where("userId", "in", following));

    const querySnapshot = await getDocs(q);
    
    const userFollowedPhotos = querySnapshot.docs.map((photo) => ({
        ...photo.data(),
        docId:photo.id
    }))

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async(photo)=>{
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)){
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0]
            return { username , ...photo , userLikedPhoto}
        })
    );

    return photosWithUserDetails;

}


export async function handleLikes(userId , docId , toggleLiked){
  
    const userFollowingRef = doc(db, "photos", docId);
    await updateDoc(userFollowingRef , {
      likes : toggleLiked ? arrayRemove(userId) : arrayUnion(userId)
    });
}


export async function handleComments(docId , displayName , comment){
 
    const userCommentRef = doc(db, "photos", docId);
    await updateDoc(userCommentRef , {
      comments : arrayUnion({displayName , comment})
    });
}

export async function isUserFollowingProfile(loggedInUser , profileUserId){
    const q = query(collection(db, "users"), where("username", "==", loggedInUser) , where('following', 'array-contains', profileUserId ));
    const queryDocs = await getDocs(q)
    const user = queryDocs.docs.map((item) => ({
        ...item.data(),
        docId:item.id
    }))

    return user.length > 0 ? true : false
    
}


export async function toggleFollow(isFollowingProfile , activeUserDocId , profileDocId, profileUserId, followingUserId){
    await updateLoggedInUserFollowing(activeUserDocId,profileUserId,isFollowingProfile)
    await updateFollowedUserFollowers(profileDocId ,followingUserId, isFollowingProfile)
}