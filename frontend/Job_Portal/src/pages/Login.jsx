import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAllError, login } from '../storre/slices/UserSlice';
import { toast } from 'react-toastify';
import { FaRegUser,FaEye,FaEyeSlash } from "react-icons/fa";
import {RiLock2Fill } from "react-icons/ri";
import {MdMailOutline } from "react-icons/md";

const Login = () => {
  const dispatch=useDispatch();
  const {loading,isAuthenticated,error,message}=useSelector(state=>state.user);
  const [show,setShow]=useState(false);
  const navigateTo=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('');
  const handleLogin=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('role',role);
    formData.append('email',email);
    formData.append('password',password);
    dispatch(login(formData));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllError());
    }
    if(isAuthenticated){
      toast.success(message)
      navigateTo('/')
    }
    
  },[dispatch,error,isAuthenticated,loading])
  return (
   <div className='loginAuth'>
     <div className='auth container'>
      <form onSubmit={handleLogin}>
   <div className='inputTag'>
   <label>Login As</label>
   <div>
   <select value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value=''>Select A Role</option>
        <option value='Employer'>Login as an Employer</option>
        <option value='Job Seeker'>Login as a Job Seeker</option>
      </select>
    <FaRegUser className='s_icon'/>
   </div>
   </div>
   <div className='inputTag'>
   <label>Email</label>
   <div>
   <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter a email'/>
    <MdMailOutline className='icon'/>
   </div>
   </div>
   <div className='inputTag'>
   <label>Password</label>
   <div>
   <input value={password} type={`${show?'text':'password'}`} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter a password'/>
   {
    show?<FaEye className='icon' onClick={()=>setShow(!show)}/>:<FaEyeSlash className='icon' onClick={()=>setShow(!show)}/>
   }
   </div>
   </div> 
  <div className='forgotPassword'>
  <Link to='/forgotPassword'>Forgot Password</Link>  
  </div>
   <button type='submit' className='color-btn'>Login</button>
   <button className='without-color-btn'>
    <Link to={'/register'}>
    Register
    </Link>
   </button>
      </form>
    </div>
   </div>
  )
}

export default Login
