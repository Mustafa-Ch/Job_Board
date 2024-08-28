import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllApplicationError, resetAllApplication, deleteApplication, jobSeekerApplications } from '../storre/slices/ApplicationSlice';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

function Applications() {
  const { applications, loading, error, message } = useSelector(state => state.application);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(jobSeekerApplications());
  },[])
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllApplication());
    }
  }, [error, message]);
  
  const deleteApplications = (id) => {
    dispatch(deleteApplication(id)).then(()=>{
      dispatch(jobSeekerApplications());
    });
  }
  
  
  return (
    <div className='profile'>
      {
        loading ? <Spinner /> : applications.length === 0 ? (
          <h2>You don't have any applications yet</h2>
        ) : (
          <>
            <h2>Your Applications</h2>
            {
              applications.map((element) => (
                <div className='applicationCard' key={element._id}>
                  <h3>Title</h3>
                  <p>{element.jobInfo.jobTitle}</p>
                  <h3>Name</h3>
                  <p>{element.jobSeekerInfo.name}</p>
                  <h3>Email</h3>
                  <p>{element.jobSeekerInfo.email}</p>
                  <h3>Phone</h3>
                  <p>{element.jobSeekerInfo.phone}</p>
                  <h3>Address</h3>
                  <p>{element.jobSeekerInfo.address}</p>
                  <h3>Cover Letter</h3>
                  <p>{element.jobSeekerInfo.coverLetter}</p>
                  <div className='applicationsBtn'>
                    <button onClick={() => deleteApplications(element._id)} className='deleteBtn'>Delete Application</button>
                    <button>
                      <Link to={element.jobSeekerInfo.resume.url}>View Resume</Link>
                    </button>
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

export default Applications;
