import { RegisterUser, getCurrentUser, loginUser, signOut } from "@/helper/apiRequest";
import { IFormValues, ILoginReq } from "@/types/types"
import { createAsyncThunk } from "@reduxjs/toolkit"



  export const loginUserAsync = createAsyncThunk(
    "auth/login",
    async ({ role, email, password }:ILoginReq, { rejectWithValue }) => {
      try {
        console.log({ role, email, password })
        const response = await loginUser({ role, email, password });
        return (response as any).data;
        
      } catch (error:any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
      }
    }
  );

  export const registerUserAsync = createAsyncThunk(
    "auth/register",
    async ({ role, email, password,name,hospitalName ,organisationName,website,address,phone}:IFormValues, { rejectWithValue }) => {
      try {
        const response = await RegisterUser({ role, email, password,name,hospitalName ,organisationName,website,address,phone});
        return (response as any).data;
        
      } catch (error:any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
      }
    }
  );

  export const getCurrentUserAsync = createAsyncThunk(
    "auth/currentUser",
    async ({ rejectWithValue }:any) => {
      try {
        const response = await getCurrentUser();
        return (response as any)?.data;
        
      } catch (error:any){
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
      }
    }
  );

  export const signOutAsync = createAsyncThunk(
    "auth/logout",
    async ({ rejectWithValue }:any) => {
      try {
        const response = await signOut();
        return (response as any)?.data;
        
      } catch (error:any){
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
      }
    }
  );