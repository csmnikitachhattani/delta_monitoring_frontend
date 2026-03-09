import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ---------------- DELETE API ---------------- */

export const deleteItem = createAsyncThunk(
  "deleteModal/deleteItem",
  async ({ id, type }, { rejectWithValue }) => {
    try {

      let url = "";

      if (type === "department") {
        url = `http://localhost:3001/api/auth/department-entry/${id}`;
      } else if (type === "district") {
        url = `/api/delete-district/${id}`;
      }

      const response = await axios.delete(url);

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

/* ---------------- INITIAL STATE ---------------- */

const initialState = {
  open: false,
  itemId: null,
  type: null,
  loading: false,
  error: null
};

/* ---------------- SLICE ---------------- */

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,

  reducers: {

    openDeleteModal: (state, action) => {
      console.log(action)
      state.open = true;
      state.itemId = action.payload.id;
      state.type = action.payload.type;
    },

    closeDeleteModal: (state) => {
      state.open = false;
      state.itemId = null;
      state.type = null;
    }

  },

  extraReducers: (builder) => {

    builder
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteItem.fulfilled, (state) => {
        state.loading = false;
        state.open = false;
        state.itemId = null;
        state.type = null;
      })

      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }

});

/* ---------------- EXPORT ---------------- */

export const { openDeleteModal, closeDeleteModal } = deleteModalSlice.actions;

export default deleteModalSlice.reducer;