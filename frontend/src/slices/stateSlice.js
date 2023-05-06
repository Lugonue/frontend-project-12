import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorized: false,
  token: '',
  currentUser: {
    name: '',
    id: '',
  }
};

export const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setAuthorized: (state) => {
      state.authorized = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser.name = action.payload.name;
    }
  },
})




export  const { setAuthorized, setToken, setCurrentUser } = slice.actions;
export default slice.reducer;
