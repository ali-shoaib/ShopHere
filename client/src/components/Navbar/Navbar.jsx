import React,{useState,useRef} from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import {FaShopify} from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { logout } from "../../api/internal";
import { resetAdmin } from "../../store/adminSlice";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const [show,setShow] = useState(false);

  const getNavClass = () => {
    if (!showNav) return "";
    return style.responsive_nav;
  };

  const handleSignOut = async () => {
   try{
    let res = await logout();
    if(res.data.success && res.status===200){
      dispatch(resetUser());
      dispatch(resetAdmin());
      setShow(false);
    }
   }
   catch(err){
    console.log(err);
   }
  };

  const addClass = () => {
    if(show) return style.active_options
    return '';
  }

  const navref = useRef();
  return (
    <header>
      <NavLink to="/" className={style.logo}>
        <FaShopify/>
       ShopHere
      </NavLink>
      <nav ref={navref} className={`${style.navbar} ${getNavClass()}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? style.activeStyle : style.inActiveStyle
          }
        >
          Home
        </NavLink>
        <NavLink
          to="categories"
          className={({ isActive }) =>
            isActive ? style.activeStyle : style.inActiveStyle
          }
        >
          Categories
        </NavLink>
        {isAuthenticated ?
          <>
            <button className={style.userbtn} onClick={()=>setShow(!show)}>{isAdmin ? 'Admin' : 'User'}</button>  
            <div style={{position:'relative'}}>
              <ul className={`${style.useroptions} ${addClass()}`}>
                <li>Profile</li>
                <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? style.activeStyle : style.inActiveStyle
                  }
                >
                  <button className={style.signOutButton} onClick={handleSignOut}>
                    SignOut
                  </button>
                </NavLink>
                </li>
              </ul>
            </div>
            <NavLink
              to="cart"
              className={({ isActive }) =>
              isActive ? style.activeStyle : style.inActiveStyle
              }
            >
              Cart (0)
            </NavLink>
          </>
          :
          <>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
            >
              Login
            </NavLink>
            <NavLink
              to="register"
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
            >
              Register
            </NavLink>
          </>
        }
      </nav>
      <button
        className={style.options}
        onClick={() => setShowNav(!showNav)}
      >
        {showNav ?
        <span style={{background:'none',color:"#000",fontSize:'20px'}}>X</span>:
        <>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </>
        }
      </button>
      <div className={style.separator}></div>
    </header>
  );
}

export default Navbar;