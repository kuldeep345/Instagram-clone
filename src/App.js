import { lazy, Suspense } from "react";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'

const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const SignUp = lazy(() => import('./pages/SignUp'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}/>
       <Routes>
          <Route path="/">
              <Route path={ROUTES.DASHBOARD} element={<Home/>}/>
              <Route path={ROUTES.LOGIN} element={<Login/>}/>
              <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>
          </Route>
       </Routes>
    </Router>
  );
}

export default App;
