import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { clearAllError, register, verifiedMail } from '../storre/slices/UserSlice';
import {toast} from 'react-toastify'
import { FaAddressBook, FaPencilAlt, FaRegUser,FaEye,FaEyeSlash } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdMailOutline, MdOutlineMailOutline } from "react-icons/md";


const Register = () => {
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('')
  const [coverLetter,setCoverLetter]=useState('');
  const [avatar,setAvatar]=useState('');
  const [resume,setResume]=useState('');
  const [firstNiche,setFirstNiche]=useState('');
  const [secondNiche,setSecondNiche]=useState('');
  const [thirdNiche,setThirdNiche]=useState('');
  const[role,setRole]=useState('');
  const[address,setAddress]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [show,setShow]=useState(false);
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
  const handleResume=(e)=>{
    const file=e.target.files[0];
    setResume(file)
  };
  const handleAvatar=(e)=>{
   const file=e.target.files[0];
   setAvatar(file);
  }
  const {loading,isAuthenticated,error,message}=useSelector(state=>state.user);
 
  const dispatch=useDispatch();
  const navigateTo=useNavigate();

  const handleRegister=(e)=>{
 e.preventDefault();
 const formData=new FormData();
 formData.append('role',role);
 formData.append('fullName',fullName);
 formData.append('email',email);
 formData.append('password',password);
 formData.append('address',address);
 formData.append('phone',phone);
 if(role==='Job Seeker'){
  formData.append('firstNiche',firstNiche);
 formData.append('secondNiche',secondNiche);
 formData.append('thirdNiche',thirdNiche);
 formData.append('avatar',avatar);
 formData.append('resume',resume);
 formData.append('coverLetter',coverLetter);
}
dispatch(register(formData))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllError());
    }
    if(isAuthenticated){
     navigateTo('/');
    }
    
  },[dispatch,error,loading,isAuthenticated,message]);


  return (
    <div className='auth'>
    <div className='container'>
    <h1>Create a new account</h1>
    <form onSubmit={handleRegister}>
    <div className='wrapper'>
   <div className='inputTag'>
   <label>Register As</label>
   <div>
    <select value={role} onChange={(e)=>setRole(e.target.value)} >
    <option value=''>Select A Role</option>
    <option value='Employer'>Register as an Employer</option>
    <option value='Job Seeker'>Register as a Job Seeker</option>
    </select>
<FaRegUser className='s_icon'/>
   </div>

   </div>
   <div className='inputTag'>
   <label>Full Name</label>
   <div>
   <input value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder='Enter A Full Name'/>
   <FaPencilAlt className='icon'/>
   </div>
   </div>
    </div>
   <div className='wrapper'>
   <div className='inputTag'>
   <label>Email</label>
   <div>
   <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter A Email'/>
   <MdMailOutline className='icon'/>
   </div>
   </div>
  <div className='inputTag'>
  <label>Password</label>
  <div>
  <input value={password} type={`${show?'text':'password'}`} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter a password'/>
   {
    show?<FaEye className='icon' onClick={()=>setShow(!show)}/>:<FaEyeSlash className='icon' onClick={()=>setShow(!show)}/>
   }
  </div>
  </div>
   </div>
   <div className='wrapper'>
   <div className='inputTag'>
   <label>Address</label>
   <div>
   <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter A Address'/>
   <FaAddressBook className='icon'/>
   </div>
   </div>
  <div className='inputTag'>
  <label>Phone</label>
  <div>
  <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter A Phone Number'/>
  <FaPhoneFlip className='icon'/>
  </div>
  </div>
   </div>

  
    {role==='Job Seeker'&&(
      <>
     <div className='wrapper'>
   <div className='inputTag'>
   <label>First Niche</label>
   <div>
   <select value={firstNiche} onChange={(e)=>setFirstNiche(e.target.value)}>
         <option value=''>Choose Your Firts Niche</option>
      {
        nichesArray.map((niche,index)=>(
         <>
         <option value={niche} key={index}>{niche}</option>
         </>

        ))
      }
    </select>
    <MdCategory className='s_icon'/>
   </div>
   </div>
   <div className='inputTag'>
   <label>Second Niche</label>
   <div>
   <select value={secondNiche} onChange={(e)=>setSecondNiche(e.target.value)}>
         <option value=''>Choose Your Second Niche</option>
      {
        nichesArray.map((niche,index)=>(
         <>
         <option value={niche} key={index}>{niche}</option>
         </>

        ))
      }
    </select>
    <MdCategory className='s_icon'/>
   </div>
   </div>
   <div className='inputTag'>
   <label>Third Niche</label>
   <div>
   <select value={thirdNiche} onChange={(e)=>setThirdNiche(e.target.value)}>
         <option value=''>Choose Your Third Niche</option>
      {
        nichesArray.map((niche,index)=>(
         <>
         <option value={niche} key={index}>{niche}</option>
         </>

        ))
      }
    </select>
    <MdCategory className='s_icon'/>
   </div>
   </div>
     </div>
     <div className='wrapper'>
     <div className='inputTag'>
      <label>Upload Resume</label>
      <div>
      <input type='file' onChange={handleResume}/>
 
      </div>
     </div>
     <div className='inputTag'>
      <label>Upload Avatar</label>
      <div>
      <input type='file' onChange={handleAvatar}/>
   
      </div>
     </div>
    
     </div>
    <div className='wrapper'>
      <div className='inputTag'>
        <label>Cover Letter</label>
        <div>
        <textarea rows={10} value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} placeholder='Write your cover letter'/>
        </div>
      </div>
    </div>
      </>
    )} 
    <button type='submit' className='color-btn'>Register</button>
    <button className='without-color-btn'>
      <Link to={'/login'}>
      Login  Now
      </Link>
    </button>
  </form>
    </div>
    </div>
  )
}

export default Register
