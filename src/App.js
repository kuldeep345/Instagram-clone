import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import * as ROUTES from './constants/routes'
import userContext from './context/user'
const Profile = lazy(() => import('./pages/Profile'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const SignUp = lazy(() => import('./pages/SignUp'))
const NotFound = lazy(()=> import('./pages/NotFound'))


function App() {

  const [fetchPhotos, setfetchPhotos] = useState(false)
  console.log(fetchPhotos)

  return (
    <userContext.Provider value={{fetchPhotos , setfetchPhotos}}>
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
       <Routes>
          <Route path="/">
              <Route path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
              <Route path={ROUTES.LOGIN} element={<Login/> }/>
              <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>
              <Route path={ROUTES.NOT_FOUND} element={<NotFound/>}/>
              <Route path={ROUTES.PROFILE} element={<Profile/>}/>
          </Route>
       </Routes>
       </Suspense>
    </Router>
    </userContext.Provider>
  );
}

export default App;
