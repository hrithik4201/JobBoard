import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;

export default authSlice.reducer;
