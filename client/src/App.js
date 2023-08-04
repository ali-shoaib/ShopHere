import Footer from './components/Footer/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import style from './App.module.css';
import Home from './pages/Home/Home';
import Policy from './pages/Policy/Policy';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import useAutoLogin from './hooks/useAutoLogin';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard/Dashboard';
import Protected from './components/Protected/Protected';
import useAuthAdmin from './hooks/useAuthAdmin';

function App() {
  const isAuth = useSelector(state => state.user.auth);

  const isAdmin = useAuthAdmin();

  console.log("isAdmin => ",isAdmin);

  useAutoLogin();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className={style.layout}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/policy' element={<Policy />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Signup />}/>
            <Route path='/dashboard' element={
              <Protected isAdmin={isAdmin}>
                <Dashboard />
              </Protected>
            }/>
            <Route path='*' element={<ErrorPage msg="404 - Page Not Found :(" />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
