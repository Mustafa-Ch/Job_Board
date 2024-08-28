import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const jobSlice=createSlice({
    name:"jobs",
    initialState:{
        jobs:[],
        loading:false,
        error:null,
        message:null,
        singleJob:{},
        myJobs:[]       
    },
    reducers:{
        requestForAllJobs(state,action){
          state.loading=true;
          state.error=null
        },
        successForAllJobs(state,action){
           state.loading=false;
           state.error=null;
           state.jobs=action.payload
        },
        failiureForAllJobs(state,action){
          state.loading=false;
          state.error=action.payload;
        },
        requestForSingleJob(state,action){
            state.loading=true;
            state.error=null;
        },
        successForSingleJob(state,action){
            state.loading=false;
            state.error=null;
            state.singleJob=action.payload;
        },
        failiureForSingleJob(state,action){
             state.loading=false;
             state.error=action.payload;
             state.singleJob=state.singleJob;
        },
        requestForPostJob(state,action){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        successForPostJob(state,action){
            state.loading=false;
            state.message=action.payload;
            state.error=null;
        },
        failedPostJob(state,action){
             state.loading=false;
             state.message=null;
             state.error=action.payload;
        },
        requestForMyJob(state,action){
            state.loading=true;
            state.myJobs=[];
            state.message=null;
            state.error=null;
        },
        successForMyJobs(state,action){
            state.loading=false;
            state.error=null;
            state.message=action.payload.message;
            state.myJobs=action.payload.myJobs
        },
        failedMyJobs(state,action){
          state.loading=false;
          state.error=action.payload;
          state.myJobs=state.myJobs;
          state.message=null;
        },
        requestForDeleteJob(state,action){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        successForDeleteJob(state,action){
             state.loading=false;
             state.error=null;
             state.message=action.payload;
        },
        failedDeleteJob(state,action){
          state.loading=false;
          state.error=action.payload;
          state.message=null;
        },
        clearAllError(state,action){
           state.error=null;
           state.jobs=state.jobs
        },
        resetJobSlice(state,action){
         state.error=null;
         state.loading=false;
         state.jobs=state.jobs;
         state.myJobs=state.myJobs;
         state.message=null;
         state.singleJob={}
        }
    }
});
export const deleteJob=(id)=>async(dispatch)=>{
    dispatch(jobSlice.actions.requestForDeleteJob());
    try{
      const response=await axios.delete(`https://job-board-nqyy.vercel.app/job/v1/deleteJob/${id}`,{withCredentials:true});
      dispatch(jobSlice.actions.successForDeleteJob(response.data.message))
      dispatch(jobSlice.actions.clearAllError());
    }catch(error){
      dispatch(jobSlice.actions.failedDeleteJob(error.response.data.message));
    }
}
export const fetchJobs=(city,niche,searchKeyword)=>async(dispatch)=>{
try {
    dispatch(jobSlice.actions.requestForAllJobs());
let link=" https://job-board-nqyy.vercel.app/job/v1/getAllJobs?";

const query=[];
if(city){
    query.push(`city=${city}`)
};
if(niche){
    query.push(`niche=${niche}`)
}
if(searchKeyword){
query.push(`searchKeyword=${searchKeyword}`)
}
link+=query.join("&");
const response=await axios.get(link,{withCredentials:true});
dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
dispatch(jobSlice.actions.clearAllError())

} catch (error) {
    dispatch(jobSlice.actions.failiureForAllJobs(error.response.data.message))
}
}

export const fetchSingleJob=(id)=>async(dispatch)=>{
   dispatch(jobSlice.actions.requestForSingleJob());
   try{
    const response=await axios.get(` https://job-board-nqyy.vercel.app/job/v1/getSingleJob/${id}`,{withCredentials:true});
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllError())
 
   }catch(error){
      dispatch(jobSlice.actions.failiureForSingleJob(error.response.data.message));
   }
}
export const MyyJobs=()=>async(dispatch)=>{
   dispatch(jobSlice.actions.requestForMyJob());
   try{
      const response=await axios.get('https://job-board-nqyy.vercel.app/job/v1/getMyJobs',{withCredentials:true});
      dispatch(jobSlice.actions.successForMyJobs(response.data));
      dispatch(jobSlice.actions.clearAllError());
   }catch(error){
    dispatch(jobSlice.actions.failedMyJobs(error.response.data.message))
   }
}
export const postJob=(data)=>async(dispatch)=>{
    dispatch(jobSlice.actions.requestForPostJob());
    try{
       const response=await axios.post(' https://job-board-nqyy.vercel.app/job/v1/postJob',data,{
        withCredentials:true,
        headers:{'Content-Type':'application/json'} 
       });
       dispatch(jobSlice.actions.successForPostJob(response.data.message))
       dispatch(jobSlice.actions.clearAllError());
    }catch(error){
     dispatch(jobSlice.actions.failedPostJob(error.response.data.message));
    }
}
export const clearAllJobError=()=>(dispatch)=>{
    dispatch(jobSlice.actions.clearAllError());
}
export const resetJobSlice=()=>(dispatch)=>{
    dispatch(jobSlice.actions.resetJobSlice());
}

export default jobSlice.reducer;