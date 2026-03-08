import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  itemId: null
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {

    openDeleteModal: (state, action) => {
      state.open = true;
      state.itemId = action.payload;
    },

    closeDeleteModal: (state) => {
      state.open = false;
      state.itemId = null;
    }

  }
});

export const { openDeleteModal, closeDeleteModal } = deleteModalSlice.actions;

export default deleteModalSlice.reducer;