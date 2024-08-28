import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { clearAllApplicationError, postApplication, resetAllApplication } from '../storre/slices/ApplicationSlice';
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { fetchSingleJob } from '../storre/slices/JobSlice';
const Application = () => {
  const {isAuthenticated,user}=useSelector(state=>state.user);
  const {error,message,loading}=useSelector(state=>state.application);
  const {singleJob}=useSelector(state=>state.jobs)
  const dispatch=useDispatch();
  const navigateTo=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [coverLetter,setCoverLetter]=useState("");
  const[resume,setResume]=useState("");
   const {jobId}=useParams();
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',name)
    formData.append('email',email)
    formData.append('address',address)
    formData.append('coverLetter',coverLetter)
    formData.append('phone',phone)
    if(resume){
      formData.append('resume',resume)
    }
      dispatch(postApplication(formData,jobId));
      
  }
  useEffect(()=>{
if(user&&user.role==='Employer'){
  navigateTo('/');
}
    if(user){
      setName(user&&user.fullName);
      setEmail(user&&user.email);
      setAddress(user&&user.address);
      setCoverLetter(user&&user.coverLetter);
      setPhone(user&&user.phone);
      setResume(user&&user.resume&&user.resume.url);
    }
    if(error){
      toast.error(error);
      dispatch(clearAllApplicationError());
    }
    if(!isAuthenticated){
      navigateTo('/login')
    }
    if(message){
    toast.success(message);
    navigateTo('/jobs');
    dispatch(resetAllApplication())
    }
    dispatch(fetchSingleJob(jobId));
  },[error,user,loading]);


  const handleResume=(e)=>{
    const file=e.target.files[0];
    setResume(file);
  }

  let offers=[];
  let qualifications=[];
  let responsibilities=[];
     
   if(singleJob.offers){
    offers=singleJob.offers.split('.');
   }  
   if(singleJob.qualifications){
      qualifications=singleJob.qualifications.split('.');
   }
   if(singleJob.responsibilities){
    responsibilities=singleJob.responsibilities.split('.');
   }


  return (
    <div className='application container'>
      <form className='formSection' onSubmit={handleSubmit}>
      <h3>Application Form</h3>
        <div className='inputTag'>
        <label>Job Title</label>
        <input type='text' value={singleJob.title} disabled/>
        </div>
        <div className='inputTag'>
        <label>Your Name</label>
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='inputTag'>
        <label>Your Email</label>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='inputTag'>
        <label>Your Phone</label>
        <input type='text' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </div>
        <div className='inputTag'>
        <label>Your Address</label>
        <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)}/>
        </div>
        <div className='inputTag'>
        <label>Your CoverLetter</label>
        <textarea rows={10} type='text' value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}/>
        </div>
        <div className='inputTag'>
        <label>Your Resume</label>
        <input type='file' onChange={handleResume}/>
        </div>
        
        <div className='btn-wrapper'><button type='submit'>Apply</button></div>
        
      </form>
      <div className='jobSection'>
       <div>
       <h3>{singleJob.title}</h3>
        <p>{singleJob.location}</p>
        <p>Rs.{singleJob.salary} a month</p>
       </div>
        <hr/>
        <div className='appDiv'>
            <h3>Job Details</h3>
        <p><IoMdCash/> Pay</p>
        <p>{singleJob.salary}</p>
        <p><FaToolbox/>Job Type</p>
        <p>{singleJob.job_type}</p>
        </div>
        <hr/>
       <div className='appDiv'>
       <h3>Location</h3>
       <p><FaLocationDot/> {singleJob.location}</p>
       </div>
        <hr/>
      <div className='appDiv'>
      {
        singleJob.introduction&&(
          <>
          <h3>What We Are</h3>
          <p>{singleJob.introduction}</p>
          </>
        )
       }
        <h3>Full Job Description</h3>
        <p>{singleJob.description}</p>
        <h3>Qualifications</h3>
        <li>{qualifications}</li>
        <h3>Responsibilities</h3>
        <li>{responsibilities}</li>
        {
          singleJob.offers&&(
          <>
          <h3>Offers</h3>
          <li>{offers}</li>
          </>
          )
        }
        <h3>Job Niche</h3>
        <p>{singleJob.job_niche}</p>
      </div>
      </div>
    </div>
  )
}

export default Application

