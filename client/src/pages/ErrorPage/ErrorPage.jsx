import React from 'react'
import { Link } from 'react-router-dom';
import style from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={style.wrapper}>
      <h1>404 - Page Not Found :(</h1>
      <div>
      <span>Go back to</span>
      <button>
        <Link to="/">Home</Link>
      </button>

      </div>
    </div>
  )
}

export default ErrorPage