import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    loading:false,
    error:null,
    isAuthenticated:false,
    user:{},
    message:null,
    isVerified:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        requestForRegister(state,action){
            state.loading=true;
            state.error=null;
            state.isAuthenticated=false;
            state.message=null;
            state.user={}
        },
        successForRegister(state,action){
         state.loading=false;
         state.isAuthenticated=true;
         state.error=null;
         state.message=action.payload.message;
         state.user=action.payload.user
        },
        registerFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
            state.user={};
            state.isAuthenticated=false;
        },
        requestForLogin(state,action){
           state.loading=true;
           state.error=null;
           state.isAuthenticated=false;
           state.user={};
           state.message=null
        },
        successForLogin(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.error=null;
            state.message=action.payload.message;
            state.user=action.payload.user
        },
        loginFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
            state.user={};
            state.isAuthenticated=false;
        },
        requestForFetchUser(state,action){
           state.loading=true;
           state.error=null;
           state.isAuthenticated=false;
           state.message=null;
           state.user={}
        },
        successForFetchUser(state,action){
         state.loading=false;
         state.error=null;
         state.isAuthenticated=true;
         state.user=action.payload;
        },
        failedFetchUser(state,action){
         state.loading=false;
         state.error=action.payload;
         state.user={};
         state.isAuthenticated=false;
         state.message=null;
        },
        successForLogout(state,action){
            state.error=null;
            state.isAuthenticated=false;
            state.user={};
            state.message=action.payload;
        },
        failedLogout(state,action){
            state.error=action.payload;
            state.isAuthenticated=state.isAuthenticated;
        },
        requestForForgotPassword(state,action){
            state.error=null;
            state.message=null;
        },
        successForForgotPassword(state,action){
            state.error=null;
            state.message=action.payload;
        },
        failedForgotPassword(state,action){
          state.error=action.payload;
          state.message=null;
        },
        requestForResetPassword(state,action){
            state.error=null;
            state.message=null;
            state.isAuthenticated=false;
            state.user={};
        },
        successForResetPassword(state,action){
            state.isAuthenticated=true
            state.error=null;
            state.message=action.payload.message;
            state.user=action.payload.user;
        },
        failedResetPassword(state,action){
          state.error=action.payload;
          state.message=null;
          state.user=state.user;
          state.message=null;
        },
        requestForVerifiedMail(state,action){
            state.error=null;
            state.message=null;
        },
        successForVerifiedMail(state,action){
            state.error=null;
            state.message=action.payload;
        },
        failedVerifiedMail(state,action){
          state.error=action.payload;
          state.message=null;
        },
        requestForMailVerification(state,action){
            state.error=null;
            state.message=null;
            state.isVerified=false;
        },
        successForMailVerification(state,action){
            state.error=null;
            state.message=action.payload;
            state.isVerified=true
        },
        failedMailVerification(state,action){
          state.error=action.payload;
          state.message=null;
          state.isVerified=false;
        },
        clearAllError(state,action){
            state.error=null;
            state.user=state.user
        }
    }
})

export const register=(userData)=>async(dispatch)=>{
dispatch(userSlice.actions.requestForRegister());
try {
    const response=await axios.post('https://job-board-nqyy.vercel.app/user/v1/createUser',userData,{
        withCredentials:true,
        headers:{'Content-Type':'multipart/form-data'}
    })
 dispatch(userSlice.actions.successForRegister(response.data));
 dispatch(userSlice.actions.clearAllError());
} catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message))
}
}

export const login=(userData)=>async(dispatch)=>{
    dispatch(userSlice.actions.requestForLogin());
    try{
      const response=await axios.post(' https://job-board-nqyy.vercel.app/user/v1/loginUser',userData,{
        withCredentials:true,
        headers: { "Content-Type": "application/json" },
      });
      
      dispatch(userSlice.actions.successForLogin(response.data));
      dispatch(userSlice.actions.clearAllError());
    }catch(error){
      dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
}

export const fetchUser=()=>async(dispatch)=>{
   dispatch(userSlice.actions.requestForFetchUser());
   try{
    const response=await axios.get('https://job-board-nqyy.vercel.app/user/v1/getUser',{
        withCredentials:true
    });
   
    dispatch(userSlice.actions.successForFetchUser(response.data.user));
    dispatch(userSlice.actions.clearAllError());
   }catch(error){
    dispatch(userSlice.actions.failedFetchUser(error.response.data.message));
   }
}

export const logout=()=>async(dispatch)=>{
    try{
     const response=await axios.get(' https://job-board-nqyy.vercel.app/user/v1/logoutUser',{
        withCredentials:true
     })
     dispatch(userSlice.actions.successForLogout(response.data.message));
     dispatch(userSlice.actions.clearAllError());
    }catch(error){
      dispatch(userSlice.actions.failedLogout(error.response.data.message));
    }
}
export const forgotPasword=(data)=>async(dispatch)=>{
 dispatch(userSlice.actions.requestForForgotPassword());
 try{
   const response=await axios.post(' https://job-board-nqyy.vercel.app/user/v1/forgotPassword',data,{
    headers:{'Content-Type':'application/json'},
    withCredentials:true
   })
   dispatch(userSlice.actions.successForForgotPassword(response.data.message));
   dispatch(userSlice.actions.clearAllError());
 }catch(error){
dispatch(userSlice.actions.failedForgotPassword(error.response.data.message));
 }
}
export const resetPassword=(data,token)=>async(dispatch)=>{
dispatch(userSlice.actions.requestForResetPassword());
try{
const response=await axios.put(` https://job-board-nqyy.vercel.app/user/v1/resetPassword/${token}`,data,{
    withCredentials:true,
    headers:{'Content-Type':'application/json'}
});
dispatch(userSlice.actions.successForResetPassword(response.data));
dispatch(userSlice.actions.clearAllError());
}catch(error){
dispatch(userSlice.actions.failedResetPassword(error.response.data.message));
}
}

export const verifiedMail=()=>async(dispatch)=>{
    dispatch(userSlice.actions.requestForVerifiedMail());
   try{
     const response=await axios.get('https://job-board-nqyy.vercel.app/user/v1/verifiedMail',{
        withCredentials:true
     });
   
     dispatch(userSlice.actions.successForVerifiedMail(response.data.message));
     dispatch(userSlice.actions.clearAllError());
   }catch(error){
   dispatch(userSlice.actions.failedVerifiedMail(error.response.data.message));
   }
}

export const mailVerification=(id)=>async(dispatch)=>{
    dispatch(userSlice.actions.requestForVerifiedMail());
    try{
      const response=await axios.put(`https://job-board-nqyy.vercel.app/user/v1/mailVerification/${id}`,{
         withCredentials:true
      });
      dispatch(userSlice.actions.successForMailVerification(response.data.message));
      dispatch(userSlice.actions.clearAllError());
    }catch(error){
    dispatch(userSlice.actions.failedMailVerification(error.response.data.message));
    }
}

export const clearAllError=()=>(dispatch)=>{
    dispatch(userSlice.actions.clearAllError());
}

export default userSlice.reducer