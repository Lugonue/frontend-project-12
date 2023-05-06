import { configureStore } from '@reduxjs/toolkit';
import channelsReduser from './channelsSlice.js';
import messagesReduser from './messagesSlice.js';
import stateReducer from './stateSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReduser,
    messages: messagesReduser,
    userState: stateReducer,
  },
})

export default store;