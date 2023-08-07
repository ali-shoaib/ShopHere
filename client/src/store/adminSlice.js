import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin:false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      const { isAdmin } = action.payload;

      state.isAdmin = isAdmin;
    },
    resetAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { setAdmin, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;