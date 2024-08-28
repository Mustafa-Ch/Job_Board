import React, { useEffect, useState } from 'react'
import { clearAllError, forgotPasword } from '../storre/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [data,setData]=useState('');
    const dispatch=useDispatch();
    const {message,error}=useSelector(state=>state.user);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('email',data);
        dispatch(forgotPasword(formData));
    }
useEffect(()=>{
if(error){
    toast.error(error);
    dispatch(clearAllError())
}
},[error])
  return (
    <div className='forgotPasswords container'>
     <form onSubmit={handleSubmit}>
    <h2>Forgot Password</h2>
      <input type='email' placeholder='Enter Your Email' value={data} onChange={(e)=>setData(e.target.value)}/>
      <button type='submit'>
        Submit
      </button>
     </form>      
    </div>
  )
}

export default ForgotPassword
