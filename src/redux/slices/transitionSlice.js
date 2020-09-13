import { createSlice } from "@reduxjs/toolkit";
import { getTransitionState } from "../../services/auth";

const transitionSlice = createSlice({
	name: "transitioning",
	initialState: true,
	reducers: {
		setTransitioning: (state, action) => (state = action.payload),
	},
});

export const selectTransitioning = (state) => state.transitioning;
export const { setTransitioning } = transitionSlice.actions;
export const transitionSliceReducers = transitionSlice.reducer;
