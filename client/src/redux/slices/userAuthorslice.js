// import necessary libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Import createSlice and createAsyncThunk from Redux Toolkit
import axios from "axios"; // Import axios for making HTTP requests

// Create asynchronous thunk to handle user login
export const userAuthorLoginThunk = createAsyncThunk(
  "user-author-admin-login",
  async (userCredObj, thunkApi) => {
  try{
      if(userCredObj.userType==="user")
      {
        const res=await axios.post("http://localhost:4000/user-api/login",userCredObj)
        if(res.data.message==="Login Success")
        {
          localStorage.setItem("token",res.data.token);
        }
        else
        {
          //throw new Error("Invalid credentials. Please try again.");
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }

      if(userCredObj.userType==="author")
      {
        const res=await axios.post("http://localhost:4000/author-api/login",userCredObj);
        if(res.data.message==="Login Success")
        {
          localStorage.setItem("token",res.data.token);
        }
        else
        {
          //throw new Error("Invalid credentials. Please try again.");
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }

      if(userCredObj.userType==="admin")
      {
        const res=await axios.post("http://localhost:4000/admin-api/login",userCredObj);
        if(res.data.message==="Login Success") 
        {
          localStorage.setItem("token",res.data.token);
        }
        else{
          //throw new Error("Invalid credentials. Please try again.");
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }
  }
  catch(err)
  {
    return thunkApi.rejectWithValue(err); 
  }
  }
); 


// Create Redux slice for user author login
export const userAuthorSlice = createSlice({
  name: "user-author-admin-login", // Slice name
  initialState: {
    isPending: false, // Flag to indicate if request is pending
    loginUserStatus: false, // Flag to indicate login status
    currentUser: {}, // Current user data
    errorOccurred: false, // Flag to indicate if error occurred
    errMsg: "", // Error message
  },
  reducers: {
    // Reset state reducer
    resetState: (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginUserStatus = false;
      state.errorOccurred = false;
      state.errMsg = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userAuthorLoginThunk.pending, (state, action) => {
        // Handle pending action
        state.isPending = true;
      })
      .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
        console.log("Admin login success action dispatched:", action);
        console.log("Admin user data:", action.payload.user);
        // Handle fulfilled action
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.loginUserStatus = true;
        state.errMsg = "";
        state.errorOccurred = false;
      })
      .addCase(userAuthorLoginThunk.rejected, (state, action) => {
        // Handle rejected action
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = action.payload || "Invalid credentials. Please try again."; // Set error message
        state.errorOccurred = true; // Set error flag
        console.log("User login rejected with error message:", state.errMsg); // Log error message
        alert(state.errMsg + " !important"); // Display alert message with !important
      })
      ,
});

// Export action creator functions
export const { resetState } = userAuthorSlice.actions;

// Export root reducer of this slice
export default userAuthorSlice.reducer;
