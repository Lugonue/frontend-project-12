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
    addNewChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter(channel => channel.id !== action.payload);
    },
    renameChannel: (state, action) => {
      state.channels = state.channels.map(channel => {
        if (channel.id === action.payload.id) {
          channel.name = action.payload.name;
        }
        return channel;
      })
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    }
  },
})

export const { setChannels, setActiveChannel, addNewChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;