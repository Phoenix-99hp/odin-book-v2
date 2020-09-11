import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../services/auth";

const userSlice = createSlice({
	name: "user",
	initialState: getUser(),
	reducers: {
		setUser: (state, action) => (state = action.payload),
		setFriendRequests: (state, action) =>
			(state.user.friendRequests = action.payload),
	},
});

export const selectUser = (state) => state.user;
export const { setUser, setFriendRequests } = userSlice.actions;
export const userSliceReducers = userSlice.reducer;
