export const isBrowser = () => typeof window !== "undefined";

export const getUser = () => {
	if (isBrowser() && window.sessionStorage.getItem("User")) {
		return JSON.parse(window.sessionStorage.getItem("User"));
	} else {
		return null;
	}
};

export const getProfile = () => {
	if (isBrowser() && window.sessionStorage.getItem("Profile")) {
		return JSON.parse(window.sessionStorage.getItem("Profile"));
	} else {
		return null;
	}
};

// export const getFetchStatus = () => {
// 	if (isBrowser() && window.sessionStorage.getItem("Fetching")) {
// 		return JSON.parse(window.sessionStorage.getItem("Fetching"));
// 	} else {
// 		return null;
// 	}
// };

export const setUserStorage = (user) =>
	isBrowser()
		? window.sessionStorage.setItem("User", JSON.stringify(user))
		: null;

export const setProfileStorage = (profile) =>
	isBrowser()
		? window.sessionStorage.setItem("Profile", JSON.stringify(profile))
		: null;

export const handleLogin = (user) => {
	if (isBrowser()) {
		setUserStorage(user);
		window.location.href = "/dashboard";
	} else {
		return null;
	}
};

export const isLoggedIn = () => {
	if (isBrowser() && getUser()) {
		return true;
	} else {
		return null;
	}
};

export const logout = () => {
	if (isBrowser()) {
		window.sessionStorage.clear();
		window.location.href = "/";
	} else {
		return null;
	}
};
