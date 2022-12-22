import { lazy, Suspense } from "react";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listner'
import userContext from './context/user'
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const SignUp = lazy(() => import('./pages/SignUp'))
const NotFound = lazy(()=> import('./pages/NotFound'))


function App() {
  
  const { user } = useAuthListener()

  return (
    <userContext.Provider value={{user}}>
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
       <Routes>
          <Route path="/">
              <Route path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
              <Route path={ROUTES.LOGIN} element={<Login/>}/>
              <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>
              <Route path={ROUTES.NOT_FOUND} element={<NotFound/>}/>
          </Route>
       </Routes>
       </Suspense>
    </Router>
    </userContext.Provider>
  );
}

export default App;
