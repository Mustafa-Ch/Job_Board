import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllJobError, postJob, resetJobSlice } from '../storre/slices/JobSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const JobPost = () => {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [location,setLocation]=useState('');
  const [jobType,setJobType]=useState('');
  const [companyName,setCompanyName]=useState('');
  const [introduction,setIntroduction]=useState('');
  const [responsibilities,setResponsibilities]=useState('');
  const [salary,setSalary]=useState('');
  const [offers,setOffers]=useState('');
  const [qualifications,setQualifications]=useState('');
  const [hiring_multiple_candidates,sethiring]=useState('');
  const [job_niche,setJobNiche]=useState('');
  const dispatch=useDispatch();
  const navigateTo=useNavigate();
  const {error,message}=useSelector(state=>state.jobs)
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('title',title);
    formData.append('description',description);
    formData.append('location',location);
    formData.append('job_type',jobType);
    formData.append('company_name',companyName);
    formData.append('introduction',introduction);
    formData.append('responsibilities',responsibilities);
    formData.append('salary',salary);
    formData.append('offers',offers);
    formData.append('qualifications',qualifications);
    formData.append('hiring_multiple_candidates',hiring_multiple_candidates);
    formData.append('job_niche',job_niche);
    dispatch(postJob(formData));
  }
  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Quetta",
    "Peshawar",
    "Sialkot",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sukkur",
    "Mardan",
    "Mingora",
    "Sheikhupura",
    "Mandi Bahauddin",
    "Larkana",
    "Nawabshah",
  ];
  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];
  useEffect(()=>{
       if(error){
        toast.error(error);
        dispatch(clearAllJobError());
       }
       if(message){
        toast.success(message);
        dispatch(resetJobSlice());
        navigateTo('/')
       }
  },[error,message]);
  return (
    <div className='postJob'>
    <h2>My Profile</h2>
    <form onSubmit={handleSubmit} className='profile'>
    <label>Title</label>
    <input value={title} onChange={(e)=>setTitle(e.target.value)}/> 
    <label>Company Name</label>
           <input value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/> 
                
                <label>Salary</label>
                <input value={salary} onChange={(e)=>setSalary(e.target.value)}/>
    <label>City</label>
    <select value={location} onChange={(e)=>setLocation(e.target.value)}>
                   <option >Select City</option>
                   {
                    cities.map((city,index)=>(
                      <option key={index}>{city}</option>
                    ))
                   }
                 </select>
    <label>Job Niche</label>
    <select value={job_niche} onChange={(e)=>setJobNiche(e.target.value)}>
                   <option>Select Job Niche</option>
                   {
                    nichesArray.map((niche,index)=>(
                      <option key={index}>{niche}</option>
                    ))
                   }
                 </select>
                 <label>Job Type</label>
                 <select value={jobType} onChange={(e)=>setJobType(e.target.value)}>
                   <option>Part Time Or Full Time</option>
                   <option value={'Full_Time'}>Full Time</option>
                   <option value={'Part_Time'}>Part Time</option>
                 </select>
                 <label>Hiring Multiple Candidates</label>
                 <select value={hiring_multiple_candidates} onChange={(e)=>sethiring(e.target.value)}>
                   <option>Yes Or No</option>
                   <option value={'Yes'}>Yes</option>
                   <option value={'No'}>No</option>
                 </select>
                 <label>Description</label>
                 <textarea rows={10} value={description} onChange={(e)=>setDescription(e.target.value)}/>
                 <label>Qualifications</label>
                 <textarea rows={10} value={qualifications} onChange={(e)=>setQualifications(e.target.value)}/>
                 <label>Responsibilities</label>
                 <textarea rows={10} value={responsibilities} onChange={(e)=>setResponsibilities(e.target.value)}/>
                 <label>Company Introduction</label>
                 <textarea rows={10} value={introduction} onChange={(e)=>setIntroduction(e.target.value)}/>
                 <label>Offers</label>
                 <textarea rows={10} value={offers} onChange={(e)=>setOffers(e.target.value)}/>
                <div className='btns'>
                <button type='submit' className='btn'>Post Job</button>
                </div>
    </form>
   </div>
  )
}

export default JobPost
