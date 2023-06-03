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
      // eslint-disable-next-line
      state.showAddModal = !state.showAddModal;
    },
    togleRenameModal: (state) => {
      // eslint-disable-next-line
      state.showRenameModal = !state.showRenameModal;
    },
    togleDeleteModal: (state, action) => {
      // eslint-disable-next-line
      state.showDeleteModal = !state.showDeleteModal;
      // eslint-disable-next-line
      state.deleteChannelId = action.payload;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
