import { createSlice } from '@reduxjs/toolkit';


export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: {
      name: '',
      id: '',
    }
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    }
  },
})

export const { setChannels, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;