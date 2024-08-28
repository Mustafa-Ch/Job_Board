import React, { useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Dashboard from './pages/Dashboard'
import Application from './pages/Application'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { fetchUser } from './storre/slices/UserSlice';
import './App.css'
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchUser());
  },[])
  return (
   <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/post/application/:jobId' element={<Application/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <ToastContainer
        position="top-right" theme='dark'/>
    </Router>
   </>
  )
}

export default App


