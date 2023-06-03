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
    togleRenameModal: (state) => {
      state.showRenameModal = !state.showRenameModal;
    },
    togleDeleteModal: (state, action) => {
      state.showDeleteModal = !state.showDeleteModal;
      state.deleteChannelId = action.payload;

    },
  },
})




export const { actions } = modalsSlice;
export default modalsSlice.reducer;
