import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function MyProfile() {
    const {user}=useSelector(state=>state.user);
  return (
    <div className='profile'>
    <h2>My Profile</h2>
    <label>Role</label>
    <input  value={user&&user.role}  disabled/> 
    <label>Full Name</label>
           <input value={user&&user.fullName} disabled/> 
    <label>Email</label>
           <input value={user&&user.email} disabled/> 
               
           {
            user&&user.role=='Job Seeker'&&(
               <>
                <div className='profileNiches'>
                <label>Niches</label>
                <input value={user&&user.niches.firstNiche} disabled/> 
                <input value={user&&user.niches.secondNiche} disabled/> 
                <input value={user&&user.niches.thirdNiche} disabled/> 
                </div>
               </>
            )
         }
         <label>Address</label>
           <input value={user&&user.address} disabled/> 
         {
            user&&user.phone&&(
                <>
                <label>Phone</label>
                <input value={user&&user.phone} disabled/>
                </> 
            )
         }
         {
            user&&user.role=='Job Seeker'&&user.coverLetter&&(
              <>
              <label>Cover Letter</label>
              <textarea rows={10} value={user&&user.coverLetter} disabled/> 
              </>
            )
         }
        
         {
            user&&user.role=='Job Seeker'&&user.resume&&(
                <Link to={user.resume.url} target='_blank'>View Resume</Link>
            )
         }
    </div>
  )
}

export default MyProfile
