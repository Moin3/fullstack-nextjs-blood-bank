import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store';
import { getCurrentUserAsync, loginUserAsync, registerUserAsync, signOutAsync } from './authAction';
import { AuthState } from '@/types/types';







const initialState: AuthState = {
    loading:false,
    user:null,
    token:null,
    error:null,
    message:null,
    isSuccess:null

}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      // login user
    builder.addCase(loginUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.isSuccess=true
      state.loading = false;
      state.user = action.payload.user;
      state.token =action.payload.token;
      state.message =action.payload.message;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
        state.isSuccess=false
        state.loading = false;
        state.error = action.payload
    });

    // register user
    builder.addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(registerUserAsync.fulfilled, (state, action) => {
        state.isSuccess=true
        state.loading = false;
        state.user = action.payload.user;
        state.message =action.payload.message;
      });
      builder.addCase(registerUserAsync.rejected, (state, action) => {
        state.isSuccess=false
        state.loading = false;
        state.error = action.error;
      });

    // get current user
    builder.addCase(getCurrentUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(getCurrentUserAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
      });
      builder.addCase(getCurrentUserAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

          // get current user
    builder.addCase(signOutAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signOutAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = null;

    });
  }
})

// Action creators are generated for each case reducer function
// export const {  } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer