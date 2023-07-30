import React from 'react'
import style from "./TextInput.module.css";

function TextInput(props) {
  return (
    <>
      <input {...props} className={style.textinput}/>
    </>
  )
}

export default TextInput