import React from 'react'
import style from './Footer.module.css';
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.info}>&copy; ShopHere {new Date().getFullYear()}</div>
      <div className={style.links}>
        <NavLink
          to="about"
        >
          About
        </NavLink>
        |
        <NavLink
          to="policy"
        >
          Policy
        </NavLink>
        |
        <NavLink
          to="contact"
        >
          Contact
        </NavLink>
      </div>
    </div>
  )
}

export default Footer