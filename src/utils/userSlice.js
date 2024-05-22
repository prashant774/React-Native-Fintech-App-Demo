import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    username: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.username = action.payload.username; // Store username on login
    },
    logout: state => {
      state.loggedIn = false;
      state.username = null; // Clear username on logout
    },
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
