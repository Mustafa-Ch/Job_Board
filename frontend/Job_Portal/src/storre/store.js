import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "./slices/JobSlice";
import UserReducer from "./slices/UserSlice";
import ApplicationReducer from "./slices/ApplicationSlice";
import UpdateProfile from "./slices/UpdateProfile";
const store=configureStore({
    reducer:{
      jobs:JobReducer,
      user:UserReducer,
      application:ApplicationReducer,
      updateUser:UpdateProfile
    }
})

export default store