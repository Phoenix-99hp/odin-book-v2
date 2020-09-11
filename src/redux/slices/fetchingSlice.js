import { createSlice } from "@reduxjs/toolkit";
// import { getFetchStatus } from "../../services/auth";

const fetchingSlice = createSlice({
	name: "fetching",
	initialState: false,
	reducers: {
		setFetching: (state, action) => (state = action.payload),
	},
});

export const selectFetching = (state) => state.fetching;
export const { setFetching } = fetchingSlice.actions;
export const fetchingSliceReducers = fetchingSlice.reducer;
