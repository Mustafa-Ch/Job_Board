import React from 'react'
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
const HowItWorks = () => {
  return (

<div className='howItWorks'>
     <h1>HOW DOES IT WORKs</h1>
      <div className='card container'>
        <div className='icon'>
       <span> <LuUserPlus/></span>
        </div>
        <h2>Create an Account</h2>
        <p>Sign up for a free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for jobs. Customize your profile to highlight your skills or requirements.</p>
      </div>
      <div className='card container'>
        <div className='icon'>
       <span> <VscTasklist/></span>
        </div>
        <h2>Post or Browse Jobs</h2>
        <p> Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.</p>
      </div>
      <div className='card container'>
        <div className='icon'>
       <span> <BiSolidLike/></span>
        </div>
        <h2>Hire or Get Hired</h2>
        <p>  Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.</p>
      </div>
    </div>
  )
}

export default HowItWorks
