import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  userId: null,
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isLogged = true;
      state.authToken = payload.authToken;
      state.userId = payload.userId
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;