import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../../services/auth";

const profileSlice = createSlice({
	name: "profile",
	initialState: getProfile(),
	reducers: {
		setProfile: (state, action) => (state = action.payload),
	},
});

export const selectProfile = (state) => state.profile;
export const { setProfile } = profileSlice.actions;
export const profileSliceReducers = profileSlice.reducer;
