import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddModal: false,
  showRenameModal: false,
  showDeleteModal: false,
  deleteChannelId: null,
  renameChannelId: null,
};

export const modalsSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    togleAddModal: (state) => {
      state.showAddModal = !state.showAddModal;
    },
    togleRenameModal: (state, action) => {
      state.showRenameModal = !state.showRenameModal;
      state.renameChannelId = action.payload;

    },
    togleDeleteModal: (state, action) => {
      state.showDeleteModal = !state.showDeleteModal;
      state.deleteChannelId = action.payload;
    },
  },
})




export const { actions } = modalsSlice;
export default modalsSlice.reducer;
