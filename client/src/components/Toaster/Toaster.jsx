import React from 'react'
import style from "./Toaster.module.css";

function Toaster({message,color}) {
  return (
    <div className={style.wrapper} style={{background:color}}>
        <span>{message}</span>
    </div>
  )
}

export default Toaster