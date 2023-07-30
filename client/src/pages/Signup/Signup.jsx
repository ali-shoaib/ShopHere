import React, { useState } from 'react'
import style from "./Signup.module.css";
import TextInput from '../../components/TextInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import {register} from '../../api/internal';

function Signup() {
  const [input,setInput] = useState({
    name:'',
    email:'',
    password:'',
    phone:'',
    gender:'',
    address:''
  })

  const options = ["Male","Female"];

  const handleChange=(e)=>{
    setInput({...input, [e.target.name]: e.target.value,})
  }

  const handleSubmit=async()=>{
    console.log("state => ",input)
  }
  return (
    <div className={style.wrapper}>
      <h1 className={style.heading}>Signup Now!</h1>
      <TextInput 
      placeholder="Name"
      name="name"
      type="text"
      value={input.name}
      onChange={handleChange}
      />
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
      <TextInput 
      placeholder="Phone" 
      name='phone'
      type="number"
      value={input.phone}
      onChange={handleChange}
      />
      <SelectInput
      name="gender"
      value={input.gender}
      onChange={handleChange}
      options={options}
      />
      <TextInput 
      placeholder="Address"
      name="address"
      type="text"
      value={input.address}
      onChange={handleChange}
      />
      <button className={style.registerbutton} onClick={handleSubmit}>Register</button>
    </div>
  )
}

export default Signup