import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorized: false,
  token: '',
  currentUser: {
    name: false,
  },

};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      // eslint-disable-next-line
      state.authorized = action.payload;
    },
    setToken: (state, action) => {
      // eslint-disable-next-line
      state.token = action.payload;
    },
    setCurrentUser: (state, action) => {
      // eslint-disable-next-line
      state.currentUser.name = action.payload.name;
    },
  },
});

export const { setAuthorized, setToken, setCurrentUser } = stateSlice.actions;
export const { actions } = stateSlice;
export default stateSlice.reducer;
