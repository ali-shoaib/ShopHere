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

function App() {
  const isAuth = useSelector(state => state.user.auth);

  const loading = useAutoLogin();
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
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='*' element={<ErrorPage />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
