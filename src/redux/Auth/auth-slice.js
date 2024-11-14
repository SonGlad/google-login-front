import { createSlice } from "@reduxjs/toolkit";
import { 
  register, 
  logIn, 
  logOut,
  refreshCurrentUser,
} from "./auth-operation";


const initialState = {
    user: {
      name: null,
      email: null,
      password: null,
    },
    isSettingsUpdated: false,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    error: null,
    currentLocation: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
  
    reducers: {
        isSettingsUpdatedtoFalse:(state) => {
            state.isSettingsUpdated = false
        },

        saveUserCurrentLocation:(state, action) => {
            state.currentLocation = action.payload
        }
    },


    extraReducers: builder => {
        builder

        // REGISTER///////////
        .addCase(register.pending, state =>{
          state.isLoading = true;
          state.error = null;
          state.isLoggedIn = false;
        })
        .addCase(register.fulfilled, (state, { payload }) => {
          state.user = {
            name: payload.username,
            email: payload.email,
            password: payload.password,
          };
          state.token = payload.token;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.error = null;
        })
        .addCase(register.rejected, (state, {payload}) => {
          state.isLoading = false;
          state.token = null;
          state.error = payload;
          state.isLoggedIn = false;
        })


        //LOGIN/////////////// 
        .addCase(logIn.pending, state => {
            state.isLoading = true;
            state.error = null;
            state.isLoggedIn = false;
        })
        .addCase(logIn.fulfilled, (state, {payload}) => {
            state.user = {
                name: payload.username,
                email: payload.email,
            };
            state.token = payload.token;
            state.isLoading = false;
            state.isLoggedIn = true;
            state.error = null;
        })
        .addCase(logIn.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.error = payload;
        })


        // LOGOUT////////
        .addCase(logOut.pending, state =>{
            state.isLoading = true;
            state.isRefreshing = false;
            state.isLoggedIn = false;
            state.error = null;
        })
        .addCase(logOut.fulfilled, (state, { payload }) => {
            state.user = {
                name: null,
                email: null,
            };
            state.token = null;
            state.isLoading = false;
            state.isLoggedIn = false;
            state.error = null;
            state.currentLocation = null;
        })
        .addCase(logOut.rejected, (state, {payload}) => {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = payload;
        })


        // REFRESH CURRENT USER////////
        .addCase(refreshCurrentUser.pending, state => {
            state.isRefreshing = true;
        })
        .addCase(refreshCurrentUser.fulfilled, (state, { payload }) => {
            state.user = {
                name: payload.username,
                email: payload.email,
            };
            state.avatarURL = payload.avatarURL;
            state.isLoggedIn = true;
            state.isRefreshing = false;
            state.error = null;
        })
        .addCase(refreshCurrentUser.rejected, (state, { payload }) => {
            state.isRefreshing = false;
            state.error = payload;
        })
    }
});



export const authReducer = authSlice.reducer;


export const {
    isSettingsUpdatedtoFalse, 
    saveUserCurrentLocation,
} = authSlice.actions;