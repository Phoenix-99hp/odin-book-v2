import { createSlice } from "@reduxjs/toolkit";
import { getShouldTransitionState } from "../../services/auth";

const shouldTransitionSlice = createSlice({
	name: "shouldTransition",
	initialState: getShouldTransitionState(),
	reducers: {
		setShouldTransition: (state, action) => (state = action.payload),
	},
});

export const selectShouldTransition = (state) => state.shouldTransition;
export const { setShouldTransition } = shouldTransitionSlice.actions;
export const shouldTransitionSliceReducers = shouldTransitionSlice.reducer;
