import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:null,
    message:null,
   isUpdated:false
}

const updateProfileSlice=createSlice({
name:'updateProfile',
initialState,
reducers:{
    requestForUpdateProfile(state,action){
       state.loading=true;
       state.error= null;
       state.message=null;
    },
    successForUpdateProfile(state,action){
      state.loading=false;
      state.error=null;
      state.message=action.payload;
      state.isUpdated=true
    },
    failedUpdateProfile(state,action){
      state.isUpdated=false;
      state.loading=false;
      state.error=action.payload;
      state.message=null;
    },
    requestForPasswordUpdate(state,action){
      state.loading=true;
      state.error=null;
      state.isUpdated=false;
      state.message=null;
    },
    successForUpdatePassword(state,action){
      state.loading=false;
      state.error=null;
      state.message=action.payload;
      state.isUpdated=true;
    },
    failedPasswordUpdate(state,action){
      state.loading=false;
      state.error=action.payload;
      state.isUpdated=false;
      state.message=null;
    },
    clearAllProfileError(state,action){
        state.error=null;
        state.isUpdated=state.isUpdated;
    },
    resetProfileAfterUpdated(state,action){
        state.loading=false;
        state.error=null;
        state.isUpdated=false;
        state.message=null
    }

}
});

export const updateProfile=(data)=>async(dispatch)=>{
  dispatch(updateProfileSlice.actions.requestForUpdateProfile());
 try{
     const response=await axios.put('http://localhost:4000/user/v1/updateUser',data,{
        withCredentials:true,
        headers: {'Content-Type':'multipart/form-data' },
     })
     dispatch(updateProfileSlice.actions.successForUpdateProfile(response.data.message));
     dispatch(updateProfileSlice.actions.clearAllProfileError());
 }catch(error){
    dispatch(updateProfileSlice.actions.failedUpdateProfile(error.response.data.message));
 }
}
export const updatePassword=(data)=>async(dispatch)=>{
  dispatch(updateProfileSlice.actions.requestForPasswordUpdate());
  try{
  const response=await axios.put('http://localhost:4000/v1/updatePassword',data,{
    headers:{'Content-Type':'application/json'},
    withCredentials:true
  });
  dispatch(updateProfileSlice.actions.successForUpdatePassword(response.data.message));
  dispatch(updateProfileSlice.actions.clearAllProfileError());
  }catch(error){
     dispatch(updateProfileSlice.actions.failedPasswordUpdate(error.response.data.message));
  }
}
export const resetProfile=()=>(dispatch)=>{
dispatch(updateProfileSlice.actions.resetProfileAfterUpdated());
}
export const clearAllUpdateError=()=>(dispatch)=>{
dispatch(updateProfileSlice.actions.clearAllProfileError());
}

export default updateProfileSlice.reducer;