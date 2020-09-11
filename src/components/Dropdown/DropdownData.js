import { logout } from "../../services/auth";

const DropdownData = [
	{
		name: "Dashboard",
		href: "/dashboard",
	},
	{
		name: "Your Profile",
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
		click: logout(),
	},
];

export default DropdownData;
