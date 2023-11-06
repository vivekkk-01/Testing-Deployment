import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
export default configureStore({
  reducer: userSlice.reducer,
});
