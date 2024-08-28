import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearAllUpdateError, resetProfile,updatePassword } from '../storre/slices/UpdateProfile';
import { FaEye,FaEyeSlash } from 'react-icons/fa';


function UpdatePassword() {
  const [oldPassword,setOldPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [consfirmPassword,setConfirmPassword]=useState('');
  const [show,setShow]=useState(false);
  const [showNew,setShowNew]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);
  const dispatch=useDispatch();
  const {message,loading,error,isUpdated}=useSelector(state=>state.updateUser);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('oldPassword',oldPassword);
    formData.append('password',newPassword);
    formData.append('c_password',consfirmPassword);
    dispatch(updatePassword(formData));
   }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUpdateError())
    }
    if(isUpdated){
      toast.success(message);
      dispatch(resetProfile())
    }
  },[error,message,loading,isUpdated]);
    
   
  return (
    <div className='profileComponents '>
    <h2>Update Password</h2>
  <form onSubmit={handleSubmit} className='profile updatePassword'>
 <div className='inputTag'>
 <label>Old Password</label>
 <div>
 <input value={oldPassword} type={`${show?'text':'password'}`} onChange={(e)=>setOldPassword(e.target.value)}/> 
 {show?<FaEye className='icon' onClick={()=>setShow(!show)}/>:<FaEyeSlash className='icon' onClick={()=>setShow(!show)}/>}
 </div>
 </div>
 <div className='inputTag'>
 <label>New Password</label>
 <div>
 <input value={newPassword} type={`${showNew?'text':'password'}`} onChange={(e)=>setNewPassword(e.target.value)}/> 
 {showNew?<FaEye className='icon' onClick={()=>setShowNew(!showNew)}/>:<FaEyeSlash className='icon' onClick={()=>setShowNew(!showNew)}/>}
 </div>
 </div>
 <div className='inputTag'>
 <label>Confirm Password</label>
 <div>
 <input value={consfirmPassword} type={`${showConfirm?'text':'password'}`} onChange={(e)=>setConfirmPassword(e.target.value)}/> 
 {showConfirm?<FaEye className='icon' onClick={()=>setShowConfirm(!showConfirm)}/>:<FaEyeSlash className='icon' onClick={()=>setShowConfirm(!showConfirm)}/>}
 </div>
 </div>
<button type='submit' className='btn'>Update Password</button>
  </form>
    </div>
  )
}

export default UpdatePassword
