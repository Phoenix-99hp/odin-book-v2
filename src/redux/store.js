import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { userSliceReducers } from "./slices/userSlice.js";
import { profileSliceReducers } from "./slices/profileSlice.js";
// import { fetchingSliceReducers } from "./slices/fetchingSlice.js";
import { transitionSliceReducers } from "./slices/transitionSlice.js";
import { shouldTransitionSliceReducers } from "./slices/shouldTransitionSlice.js";

const reducer = {
	user: userSliceReducers,
	profile: profileSliceReducers,
	transitioning: transitionSliceReducers,
	shouldTransition: shouldTransitionSliceReducers,
};

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
	reducer,
	middleware,
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
