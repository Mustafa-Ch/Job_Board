import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllError, logout } from '../storre/slices/UserSlice';
import { LuMoveRight } from "react-icons/lu";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import MyProfile from '../Components/MyProfile';
import UpdateProfile from '../Components/UpdateProfile';
import UpdatePassword from '../Components/UpdatePassword';
import MyApplications from '../Components/MyApplications';
import MyJobs from '../Components/MyJobs';
import Applications from '../Components/Applications';
import JobPost from '../Components/JobPost';

function Dashboard() {
  const [component,setComponent]=useState('My Profile');
  const [show,setShow]=useState(false);
  const {isAuthenticated,loading,error,user}=useSelector(state=>state.user);

  const dispatch=useDispatch();
  const navigateTo=useNavigate();
  const handleLogout=()=>{
    dispatch(logout());
    toast.success('You are successfully logout')
  }
  useEffect(()=>{
   
    if(error){
      toast.error(error);
      dispatch(clearAllError());
    }
    if(!isAuthenticated){
      navigateTo('/');
    }
  },[dispatch,loading,error,isAuthenticated]);

  return (
    <div className='dashboard container'>
    <div className='dashboardHeader'>
      <p>Dashboard</p>
      <p>Welcome!<span>{user&&user.fullName}</span></p>
    </div>
    <div className='dashboardContainer'>
    <div className='sideBar'>
    <h2>Manage Account</h2>
          <div className='sideLinks'>
           <ul>
            <li>
              <button onClick={()=>setComponent('My Profile')}>My Profile</button>
            </li>
            <li>
              <button onClick={()=>setComponent('Update Profile')}>Update Profile</button>
            </li>
            <li>
              <button onClick={()=>setComponent('Update Password')}>Update Password</button>
            </li>
           {
            user&&user.role=='Job Seeker'&&(
              <li>
              <button onClick={()=>setComponent('My Applications')}>My Applications</button>
            </li>
            )
           }
            {
              user&&user.role==='Employer'&&(
                <li>
              <button onClick={()=>setComponent('Post Jobs')}>Post Jobs</button>
            </li>
              )
            }
            {
              user&&user.role==='Employer'&&(
                <li>
              <button onClick={()=>setComponent('Applications')}>Applications</button>
            </li>
              )
            }
            {
              user&&user.role==='Employer'&&(
                <li>
              <button onClick={()=>setComponent('My Jobs')}>My Jobs</button>
            </li>
              )
            }
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          
           </ul>
        
          </div>
        </div>
        <div className='dashIcon' onClick={()=>setShow(!show)}>
        <LuMoveRight />
        </div>
        <div className={`${show?'show-sidebar mobile-sidebar':'mobile-sidebar'}`}>
        <h2>Manage Account</h2>
          <div className='sideLinks'>
           <ul>
            <li>
              <button onClick={()=>{
                setComponent('My Profile')
                setShow(!show)
              }}>My Profile</button>
            </li>
            <li>
              <button onClick={()=>{setComponent('Update Profile')
               setShow(!show)}}>Update Profile</button>
            </li>
            <li>
              <button onClick={()=>{setComponent('Update Password')
               setShow(!show)}}>Update Password</button>
            </li>
           {
            user&&user.role=='Job Seeker'&&(
              <li>
              <button onClick={()=>{setComponent('My Applications')
               setShow(!show)}}>My Applications</button>
            </li>
            )
           }
            {
              user&&user.role==='Employer'&&(
                <li>
              <button onClick={()=>{setComponent('Post Jobs')
              setShow(!show)}}>Post Jobs</button>
            </li>
              )
            }
            {
              user&&user.role==='Employer'&&(
                <li>
              <button onClick={()=>{setComponent('Applications')
               setShow(!show)}}>Applications</button>
            </li>
              )
            }
            {
              user&&user.role==='Employer'&&(
                <li>
              <button onClick={()=>{setComponent('My Jobs')
               setShow(!show)}}>My Jobs</button>
            </li>
              )
            }
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          
           </ul>
        
          </div>
        </div>
       
        <div className='dashboardMain'>
           {
            (()=>{
            switch(component){
              case 'My Profile':
              return <MyProfile/>;
              break;
              case 'Update Profile':
              return <UpdateProfile/>;
              break;
              case 'Update Password':
              return <UpdatePassword/>;
              break;
              case 'My Applications':
              return <MyApplications/>;
              break;
              case 'My Jobs':
              return <MyJobs/>;
              break;
              case 'Applications':
              return <Applications/>;
              break;
              case 'Post Jobs':
              return <JobPost/>;
              break;
               default:
               return null;
            }
            })()
           }
        </div>
    </div>
       

    </div>
  )
}

export default Dashboard
