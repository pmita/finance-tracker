// ROUTER
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
// PAGES
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
// COMPONENTS
import Navbar from './components/Navbar';
// HOOKS
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  // STATE
  const { authIsReady, user } = useAuthContext();

  const PrivateRouteToLogin = () => {
    return user ? <Outlet /> : <Navigate to='/login' />;
   }

   const PrivateRouteToHome = () => {
    return user ? <Navigate to='/' /> : <Outlet />;
   }


  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<PrivateRouteToLogin />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/login' element={<PrivateRouteToHome />}>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/signup' element={<PrivateRouteToHome />}>
              <Route path='/signup' element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App
