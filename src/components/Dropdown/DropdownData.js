import React from "react";
import { logout, getUser } from "../../services/auth";
import { setProfileStorage } from "../../services/auth";

const DropdownData = [
	{
		name: "Feed",
		href: "/dashboard",
	},
	{
		name: "Profile",
		click: () => setProfileStorage(getUser()),
		href: "/profile",
	},
	{
		name: "Add Friends",
		href: "/fr-send",
	},
	{
		name: "Friend Requests",
		href: "/fr-view",
	},
	{
		name: "User List",
		href: "/user-list",
	},
	{
		name: "Write Post",
		href: "/post",
	},
	{
		name: "Logout",
	},
];

export default DropdownData;
