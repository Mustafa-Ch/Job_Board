import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    loading:false,
    applications:[],
    error:null,
    message:null,
}

const applicationSlice=createSlice({
name:'application',
initialState,
reducers:{
  requestForAllApplications(state, action) {
    state.loading = true;
    state.error = null;
    
  },
  successForAllApplications(state, action) {
    state.loading = false;
    state.error = null;
    state.applications = action.payload;
  },
  failureForAllApplications(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
    requestForMyApplications(state,action){
      state.loading=true;
      state.message=null;
      state.applications=[];
      state.error=null;
    },
    successForMyApplications(state,action){
      state.loading=false;
      state.error=null;
      state.applications=action.payload.applications;
      state.message=action.payload.message;

    },
    failedMyApplications(state,action){
      state.loading=false;
      state.error=action.payload;
      state.applications=[];
      state.message=null;
    },
    requestForPostApplications(state,action){
      state.loading=true;
      state.error=null;
      state.message=null;
    },
    successForPostApplications(state,action){
      state.loading=false;
      state.error=null;
      state.message=action.payload;
    },
    failedPostApplications(state,action){
      state.loading=false;
      state.error=action.payload;
      state.message=null;
    },
    requestForDeleteApplication(state,action){
      state.loading=true;
      state.error=null;
      state.message=null;
    },
    successForDeleteApplication(state,action){
        state.loading=false;
        state.error=null;
        state.message=action.payload;
    },
    failedForDeleteApplication(state,action){
      state.loading=false;
      state.error=action.payload;
      state.message=null;
    },
    clearAllApplicationError(state,action){
        state.error=null;
    },
     resetAllApplication(state,action){
        state.error=null;
        state.loading=false;
        state.message=null;
        state.applications=state.applications;
     }

}
});

export const postApplication=(data,jobId)=>async(dispatch)=>{
     dispatch(applicationSlice.actions.requestForPostApplications());
     try{
        const response=await axios.post(` https://job-board-nqyy.vercel.app/application/v1/postApplication/${jobId}`,data,{withCredentials:true,
            headers:{'Content-Type':'multipart/form-data','Content-Type':'application/json'},
        });
        dispatch(applicationSlice.actions.successForPostApplications(response.data.message));
        dispatch(applicationSlice.actions.clearAllApplicationError());
     }catch(error){
        dispatch(applicationSlice.actions.failedPostApplications(error.response.data.message));
     }
     
}
export const employerApplications=()=>async(dispatch)=>{
    dispatch(applicationSlice.actions.requestForAllApplications());
    try{
      const response=await axios.get('https://job-board-nqyy.vercel.app/application/v1/employerApplications',{withCredentials:true});
      dispatch(applicationSlice.actions.successForAllApplications(response.data.applications));
      dispatch(applicationSlice.actions.clearAllApplicationError());
     
    }catch(error){
      dispatch(applicationSlice.actions.failureForAllApplications(error.response.data.message));
    }
}
export const jobSeekerApplications=()=>async(dispatch)=>{
    dispatch(applicationSlice.actions.requestForMyApplications());
    try{
     const response=await axios.get(' https://job-board-nqyy.vercel.app/application/v1/jobSeekerApplications',{
        withCredentials:true
     });
     dispatch(applicationSlice.actions.successForMyApplications(response.data));
     dispatch(applicationSlice.actions.clearAllApplicationError());
    }catch(error){
      dispatch(applicationSlice.actions.failedMyApplications(error.response.data.message));
    }
}
export const deleteApplication=(id)=>async(dispatch)=>{
dispatch(applicationSlice.actions.requestForDeleteApplication());
try{
  const response=await axios.delete(` https://job-board-nqyy.vercel.app/application/v1/deleteApplication/${id}`,{
   withCredentials:true
  });
    dispatch(applicationSlice.actions.successForDeleteApplication(response.data.message));
    dispatch(applicationSlice.actions.clearAllApplicationError());
}catch(error){
dispatch(applicationSlice.actions.failedForDeleteApplication(error.response.data.message));
}
}
export const clearAllApplicationError=()=>(dispatch)=>{
dispatch(applicationSlice.actions.clearAllApplicationError());
}
export const resetAllApplication=()=>(dispatch)=>{
    dispatch(applicationSlice.actions.resetAllApplication());
}

export default applicationSlice.reducer;