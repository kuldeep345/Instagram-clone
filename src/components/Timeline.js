import { useEffect , useContext } from "react"
import Skeleton from "react-loading-skeleton"
import userContext from "../context/user"
import usePhotos from "../hooks/use-photos"
import useAuthStore from "../store"
import Post from "./sidebar/post/Post"


const Timeline = () => {
   const x = usePhotos()
   const {fetchPhotos} = useContext(userContext)
  const {Photos} = useAuthStore()

  useEffect(() => {
   
  }, [fetchPhotos , !fetchPhotos])
  

  return (
    <div className="container col-span-2">
      {!Photos ? (
        <>
        {[...new Array(4)].map((_ , index)=>(
          <Skeleton key={index} count={1} width={320} height={400}/>
        ))}
        </>
      ) : Photos?.length > 0 ? (
        Photos.map((content) => <Post key={content.docId} content={content}/> ) 
      ):(
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  )
}

export default Timeline