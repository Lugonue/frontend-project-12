import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddModal: false,
  showRenameModal: false,
  showDeleteModal: false,
  deleteChannelId: '',
  renameChannelName: null,
  renameChannelId: null,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    togleAddModal: (state) => {
      state.showAddModal = !state.showAddModal;
    },
    togleRenameModal: (state, action) => {
      state.showRenameModal = !state.showRenameModal;
      if (action.payload.id && action.payload.name) {
        state.renameChannelId = action.payload.id;
        state.renameChannelName = action.payload.name;
      }
      

    },
    togleDeleteModal: (state, action) => {
      state.showDeleteModal = !state.showDeleteModal;
      state.deleteChannelId = action.payload;
      
    },
  },
})




export const { actions } = modalsSlice;
export default modalsSlice.reducer;
