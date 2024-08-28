import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../../public/logo.png'

const Navbar = () => {
  const {isAuthenticated}=useSelector(state=>state.user);
  const [isOpen,setIsOpen]=useState(false);
  
  return (
    <>
   
       
          <div className='navbar container'>
            <div className='bigScreen'>
              <img src={logo} />
              <div className={isOpen ? 'active' : ''}>
                <Link to={'/'} onClick={() => setIsOpen(prev => !prev)}>Home</Link>
                <Link to={'/jobs'} onClick={() => setIsOpen(prev => !prev)}>Jobs</Link>
                <Link to={isAuthenticated ? '/dashboard' : '/login'} onClick={() => setIsOpen(prev => !prev)}>
                  {isAuthenticated ? 'Dashboard' : 'Login'}
                </Link>
              </div>
            </div>
            <GiHamburgerMenu onClick={() => setIsOpen(prevState => !prevState)} />
          </div>
          <hr />
        </>

  
  )
}

export default Navbar
