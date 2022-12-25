import { collection, addDoc } from "firebase/firestore"; 

export async function seedDatabase(db) {
    await addDoc(collection(db , 'photos') , {
        photoId: "7",
        userId: 'tFh1UCqdcTQYUbHc9GoJ0O4DMZa2',
        imageSrc: "/images/users/kuldeep/2.jpg",
        caption: 'playing basketball with friends',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
    } )     
}