import create from 'zustand'
import { persist } from 'zustand/middleware'

const userStore= (set)=>({
  userProfile:null,
  Photos:null,
  setUser:(user) => set({userProfile:user}),
  setPhotos:(photo) => set({Photos:photo})
})

const useAuthStore = create(
  persist(userStore, {
    name:'auth'
  })
)

export default useAuthStore