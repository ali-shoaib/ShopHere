import React from 'react'
import { Link } from 'react-router-dom';
import style from "./ErrorPage.module.css";

function ErrorPage({msg}) {
  return (
    <div className={style.wrapper}>
      <div className={style.errorHeader}>{msg}</div>
      {msg !== 'Network Error' ?
      <div className={style.errorBody}>
        <span>Go back to</span>
        <button>
          <Link to="/">Home</Link>
        </button>
      </div>
      : null
      }
    </div>
  )
}

export default ErrorPage