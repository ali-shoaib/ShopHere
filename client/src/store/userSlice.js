import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:"",
  email: "",
  createdAt:"",
  auth: false,
  gender:"",
  address:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, auth, name, createdAt, gender, address } = action.payload;

      state.name = name;
      state.createdAt = createdAt;
      state.email = email;
      state.auth = auth;
      state.gender = gender
      state.address = address
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.createdAt = "";
      state.auth = false;
      state.gender = "";
      state.address = "";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;