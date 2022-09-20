import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  userCredentials : null,
  userError : {state : false, errorMsg : ""},
  userSuccess : {state : false, successMsg : ""},
  userIsLoading : true,
}

export const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignedUpUser: (state, action) => {
      state.userCredentials = action.payload;
    },
    setSignedOutUser: (state) => {
      state.userCredentials = null;
    },
    setUserError: (state, action) => {
      state.userError.state = true;
      state.userError.errorMsg = action.payload;
    },
    setUserSuccess: (state, action) => {
      state.userSuccess.state = true;
      state.userSuccess.successMsg = action.payload;
    },
    resetUserErrorSuccess : (state) => {
      state.userSuccess.state = false;
      state.userError.state = false;
      state.userSuccess.successMsg = "";
      state.userError.errorMsg = "";
    }
  }
});

export const { setSignedUpUser, setSignedOutUser, setUserError, setUserSuccess, resetUserErrorSuccess } = userslice.actions;

export default userslice.reducer;