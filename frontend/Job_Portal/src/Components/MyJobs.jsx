import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearAllJobError, deleteJob, MyyJobs, resetJobSlice } from '../storre/slices/JobSlice';
import Spinner from './Spinner';

function MyJobs() {
  const {loading,error,message,myJobs}=useSelector(state=>state.jobs);
  const dispatch=useDispatch();
 useEffect(()=>{
  dispatch(MyyJobs())
 },[])
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllJobError())
    }
    if(message){
      toast.success(message);
      dispatch(resetJobSlice());
    }
  },[dispatch,error,message]);
  const handleDelete=(id)=>{
    dispatch(deleteJob(id)).then(()=>{
      dispatch(MyyJobs());
    });
  }
  return (
    <div className='profile'>
    {
   loading?<Spinner/>:myJobs.length==0?(<h2>You don't have any job yet</h2>):(
     <>
     <h2>Your Jobs</h2>
     {
       myJobs.map((element,index)=>(
         <div className='myJobCard'>
           <h3>Title</h3>
           <p>{element.title}</p>
           <h3>Company</h3>
           <p>{element.company_name}</p>
           <h3>Job Niche</h3>
           <p>{element.job_niche}</p>
           <h3>Job Type</h3>
           <p>{element.job_type}</p>
           <h3>Salary</h3>
           <p>{element.salary}</p>
           <h3>City</h3>
           <p>{element.location}</p>
           <h3>What We Are</h3>
           <p>{element.introduction}</p>
           <h3>Description</h3>
           <p>{element.description}</p>
           <h3>Qualifications</h3>
           <p>{element.qualifications}</p>
           <h3>Responsibilities</h3>
           <p>{element.responsibilities}</p>
           <h3>Offers</h3>
           <p>{element.offers}</p>
            <div className='applicationsBtn' onClick={()=>handleDelete(element._id)}>  
            <button className='deleteBtn'>Delete Job</button>
           </div>
         </div>
       ))
     }
     </>
   )
  }
  
 </div>
  )
}

export default MyJobs
