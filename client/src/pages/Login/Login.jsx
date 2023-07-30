import React,{useEffect, useState} from 'react'
import TextInput from '../../components/TextInput/TextInput';
import style from "./Login.module.css";
import { login } from '../../api/internal';
import Toaster from '../../components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

function Login() {
  const [input,setInput] = useState({
    email:'',
    password:'',
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const showMessage = () =>{
  //   setTimeout(() => setShow(false),3000);
  // }

  const handleChange=(e)=>{
    setInput({...input, [e.target.name]: e.target.value,})
  }

  const handleSubmit=async()=>{
    if(!input.email || !input.password){
      alert("Fill all fields.");
    }
    else{
      let data = {
        email:input.email,
        password:input.password
      }
      let res = await login(data);

      if(res.status === 200 && res.data.success){
        
        const user = {
          email: res.data.user.email,
          name: res.data.user.name,
          auth: res.data.success,
          createdAt: res.data.user.createdAt,
          gender: res.data.user.gender,
          address: res.data.user.address
        };

        dispatch(setUser(user));

        input.email = '';
        input.password = '';
        navigate('/')
      }
    }
  }
  return (
    <div className={style.wrapper}>
      <h1 className={style.heading}>Login Now!</h1>
      <TextInput 
      placeholder="Email"
      name="email"
      type="text"
      value={input.email}
      onChange={handleChange}
      />
      <TextInput
      placeholder="Password"
      name='password'
      type="password"
      value={input.password}
      onChange={handleChange}
      />
      <button className={style.loginbutton} onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login