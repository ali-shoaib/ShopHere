import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import style from "./App.module.css";
import Home from "./pages/Home/Home";
import Policy from "./pages/Policy/Policy";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import useAutoLogin from "./hooks/useAutoLogin";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin/ProtectedRouteAdmin";
import Loader from "./components/Loader/Loader";
import Cart from "./pages/Cart/Cart";
import Categories from "./pages/Categories/Categories";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const isAuth = useSelector((state) => state.user.auth);

  const isAdmin = useSelector((state) => state.admin.isAdmin);

  const loading =  useAutoLogin();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {loading ?
          <Loader />
          :
          <div className={style.layout}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/policy" exact element={<Policy />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Signup />} />
            <Route
              path="/dashboard"
              exact
              element={
                <ProtectedRouteAdmin isAdmin={isAdmin} isAuth={isAuth}>
                  <Dashboard />
                </ProtectedRouteAdmin>
              }
            />
            <Route path="/cart"
              exact
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/categories"
            exact
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Categories />
              </ProtectedRoute>
            } />
            <Route
              path="*"
              element={<ErrorPage msg="404 - Page Not Found :(" />}
            />
          </Routes>
        </div>
        }
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
