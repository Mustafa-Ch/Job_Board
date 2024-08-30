import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom';
import { updateProfile,clearAllUpdateError, resetProfile } from '../storre/slices/UpdateProfile';

import { toast } from 'react-toastify';
import { fetchUser } from '../storre/slices/UserSlice';

function UpdateProfile() {
    const {user}=useSelector(state=>state.user);
    const {error,message,isUpdated}=useSelector(state=>state.updateUser);
    const [fullName,setFullName]=useState(user&&user.fullName);
    const [email,setEmail]=useState(user&&user.email);
    const [firstNiche,setFirstNiche]=useState(user&&user.role=='Job Seeker'&&user.niches.firstNiche);
    const [secondNiche,setSecondNiche]=useState(user&&user.role=='Job Seeker'&&user.niches.secondNiche);
    const [thirdNiche,setThirdNiche]=useState(user&&user.role=='Job Seeker'&&user.niches.thirdNiche);
    const [avatar,setAvatar]=useState(user&&user.avatar&&user.avatar.url);
    const [resume,setResume]=useState(user&&user.role=='Job Seeker'&&user.resume.url);
    const [address,setAddress]=useState(user&&user.address);
    const [phone,setPhone]=useState(user&&user.phone);
    const [coverLetter,setCoverLetter]=useState(user&&user.role=='Job Seeker'&&user.coverLetter);
    const navigateTo=useNavigate();
    const dispatch=useDispatch();
    const handleResume=(e)=>{
       const file=e.target.files[0];
       setResume(file);
    }
    const handleAvatar=(e)=>{
       const file=e.target.files[0];
       setAvatar(file);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('fullName',fullName);
        formData.append('email',email);
        formData.append('avatar',avatar);
        formData.append('address',address);
        formData.append('phone',phone);
        if(user.role==='Job Seeker'){
            formData.append('firstNiche',firstNiche);
            formData.append('secondNiche',secondNiche);
            formData.append('thirdNiche',thirdNiche);
            formData.append('resume',resume);
            formData.append('coverLetter',coverLetter);
        }
        dispatch(updateProfile(formData));
    }
    useEffect(()=>{
       if(error){
      toast.error(error);
      dispatch(clearAllUpdateError());
       }
       if(isUpdated){
        navigateTo('/');
        toast.success(message);
        dispatch(fetchUser());
        dispatch(resetProfile());
       }
    },[error,message,isUpdated,user]);
  return (
    <div className='profileComponents'>
    <h2>Update Profile</h2>
  <form onSubmit={handleSubmit} className='profile'>
  <label>Full Name</label>
           <input value={fullName} onChange={(e)=>setFullName(e.target.value)}/> 
    <label>Email</label>
           <input value={email} onChange={(e)=>setEmail(e.target.value)}/> 
               
           {
            user&&user.role=='Job Seeker'&&(
               <>
                <div className='profileNiches'>
                <label>Niches</label>
                <input value={firstNiche} onChange={(e)=>setFirstNiche(e.target.value)}/> 
                <input value={secondNiche} onChange={(e)=>setSecondNiche(e.target.value)}/> 
                <input value={thirdNiche} onChange={(e)=>setThirdNiche(e.target.value)}/> 
                </div>
               </>
            )
         }
         <label>Address</label>
           <input value={address} onChange={(e)=>setAddress(e.target.value)}/> 
         {
            user&&user.phone&&(
                <>
                <label>Phone</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </> 
            )
         }
         {
            user&&user.role=='Job Seeker'&&user.resume&&(
                <>
                <label>Resume</label>
                <input  type='file' onChange={handleResume}/>
                </> 
            )
         }
         {
            user&&user.avatar&&(
                <>
                <label>Avatar</label>
                <input  type='file' onChange={handleAvatar}/>
                </> 
            )
         }
         {
            user&&user.role=='Job Seeker'&&user.coverLetter&&(
              <>
              <label>Cover Letter</label>
              <textarea rows={10} value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}/> 
              </>
            )
         }
        
        <div className='btns'>
         <button type='submit' className='btn'>Update Profile</button>
        {
            user&&user.role=='Job Seeker'&&user.resume&&(
                <Link to={resume} target='_blank'>View Resume</Link>
            )
         }
        </div>
  </form>
    </div>
  )
}

export default UpdateProfile
