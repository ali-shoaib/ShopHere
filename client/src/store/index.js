import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import admin from './adminSlice'

const store = configureStore({
  reducer: { user, admin }
});

export default store;