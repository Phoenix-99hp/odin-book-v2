import React from "react";
import { logout, getUser } from "../../services/auth";
import { setProfileStorage } from "../../services/auth";

const DropdownData = [
	{
		name: "Dashboard",
		href: "/dashboard",
	},
	{
		name: "Your Profile",
		click: () => setProfileStorage(getUser()),
		href: "/profile",
	},
	{
		name: "Add Friends",
		href: "/fr-send",
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
		click: () => logout(),
	},
];

export default DropdownData;
