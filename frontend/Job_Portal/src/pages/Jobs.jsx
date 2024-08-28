import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { clearAllJobError, fetchJobs } from '../storre/slices/JobSlice';
import Spinner from '../Components/Spinner';
import {Link} from 'react-router-dom'

const Jobs = () => {
  const [city,setCity]=useState('');
  const [niche,setNiche]=useState('');
  const [searchKeyword,setSearchKeyword]=useState('');
 
  const {loading,jobs,error,}=useSelector(state=>state.jobs);
  
  const dispatch=useDispatch();
  useEffect(()=>{
   if(error){
    toast.error(error);
    dispatch(clearAllJobError());
   }
   dispatch(fetchJobs(city,niche,searchKeyword));
   dispatch(clearAllJobError());
  },[error,niche,city]);
  const handleSearch=(e)=>{
   dispatch(fetchJobs(niche,city,searchKeyword))
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


  return (
    <div className='jobs container'>
      {
        loading?<Spinner/>:<>
        <div className='serchBar'>
          <input type='text' value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)}/>
          <button onClick={handleSearch}>Find Job</button>
        </div>
        <div className='jobsMain'>
          <div className='sidebar'>
              <h3> Filter Job By City</h3>
                  <hr/>
              {
                cities.map((citie,index)=>(
                  <div key={index} className='jobLabelDiv'>
                  <input type='radio' name='city'  value={citie} onChange={(e)=>setCity(e.target.value)} checked={citie===city} id={citie}/>
                  <label htmlFor={citie}>{citie}</label>
                  </div>
                ))
              }
              <h3>Job Filter By Niche</h3>
                    <hr/>
              {
                nichesArray.map((nichee,index)=>(
                  <div key={index} className='jobLabelDiv'>
                    <input type='radio' id={nichee} value={nichee} name='niche' onChange={(e)=>setNiche(e.target.value)} checked={nichee===niche}/>
                    <label htmlFor={nichee}>{nichee}</label>
                  </div>
                ))
              }
          </div>
        <div className='jobsContainer'>
        <div className='mobile_filter'>
                  <select value={niche} onChange={(e)=>setNiche(e.target.value)}>
                  <option> Filter Job By Niche</option>
          {
                nichesArray.map((nichee,index)=>(
                <option key={index} value={nichee}>{nichee}</option>
                ))
              }
                  </select>
                  <select value={city} onChange={(e)=>setCity(e.target.value)}>
                 <option>Filter Job By City</option>
          {
                cities.map((city,index)=>(
                <option key={index} value={city}>{city}</option>
                ))
              }
                  </select>
          </div>
          <div className='displayJobs'>
          {
            jobs.map((job,index)=>(
          <div className='jobsCard' key={index}>
          <p className={job.hiring_multiple_candidates=='Yes'?'hiring-multiple':'hiring'}>{job.hiring_multiple_candidates==='Yes'?'Hiring Multiple Candidates':'Hiring'}</p>
          <h4>{job.title}</h4>
          <p><span>Company:</span> {job.company_name}</p>
          <p><span>City:</span> {job.location}</p>
          <p><span>Salary:</span> {job.salary}</p>
          <p><span>Posted On:</span> {job.job_posted.substring(0,10)}</p>
          <div className='btn-wrapper'>
          <button>
            <Link to={`/post/application/${job._id}`}>
            Apply Now
            </Link>
          </button>
          </div>
          </div>
            ))
          }
          </div>
        </div>
        </div>
     
        </>
      }
    </div>
  )
}

export default Jobs
