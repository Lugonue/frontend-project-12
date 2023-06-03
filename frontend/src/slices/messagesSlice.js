import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setMessages: messagesAdapter.setAll,
    removeMessagesInCHannel: (state, action) => {
      // eslint-disable-next-line
      state.entities = Object.values(state.entities).filter((m) => m.channelId !== action.payload);
    },
  },
});

export const { addMessage, setMessages, removeMessagesInCHannel } = messagesSlice.actions;
export const { actions } = messagesSlice;

export default messagesSlice.reducer;
