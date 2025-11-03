import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReuder from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReuder,
  },
});

export default appStore;
