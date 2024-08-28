import React, { useEffect, useState } from 'react'
import { clearAllError,  resetPassword } from '../storre/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const {token}=useParams();
    const dispatch=useDispatch();
    const navigateTo=useNavigate()
    const {message,error,isAuthenticated}=useSelector(state=>state.user);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('password',password);
        formData.append('c_password',confirmPassword);
        dispatch(resetPassword(formData,token));
    }
useEffect(()=>{
if(error){
    toast.error(error);
    dispatch(clearAllError())
}
if(isAuthenticated){
    toast.success(message);
    navigateTo('/')
}
},[error,message,isAuthenticated])
  return (
    <div className='forgotPasswords container'>
     <form onSubmit={handleSubmit}>
    <h2>Password</h2>
      <input type='text' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <h2>Confirm Password</h2>
      <input type='text' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
      <button type='submit'>
        Submit
      </button>
     </form>      
    </div>
  )
}

export default ResetPassword
