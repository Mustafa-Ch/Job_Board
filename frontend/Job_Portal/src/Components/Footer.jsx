import React from 'react'
import {Link} from 'react-router-dom'
import { FaSquareXTwitter,FaGithub } from "react-icons/fa6";
import { FaInstagram,FaFacebook } from "react-icons/fa";
import logo  from '../../public/logo.png'

const Footer = () => {
  return (
    <div className='footer'>
    <div className='cols logo'>
<img src={logo}/>
    </div>
    <div className='cols'>
      <h2>Support</h2>
      <p>Street No.009 Shahra-E-Failsal Karachi</p>
      <p>nichenest@gmail.com</p>
      <p>+3444010132</p>   
    </div>
    <div className='cols'>
    <h2>Quick Links</h2>
    <Link to={'/'}>Home</Link>
    <Link to={'/jobs'}>Jobs</Link>
    </div>
    <div className='cols'>
    <h2>Follow Us</h2>
     <p> <FaSquareXTwitter className='footerIcon'/> Twitter(X)</p>
     <p> <FaGithub className='footerIcon'/> Github</p>
      <p><FaFacebook className='footerIcon'/> Facebook</p>
      <p><FaInstagram className='footerIcon'/> Instagram</p>
    </div>
    </div>
  )
}

export default Footer
