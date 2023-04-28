import { configureStore } from '@reduxjs/toolkit';
import channelsReduser from './channelsSlice.js';
import messagesReduser from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReduser,
    messages: messagesReduser,
  },
})

export default store;