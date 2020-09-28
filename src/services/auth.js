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

export const getTransitionState = () => {
	if (isBrowser() && window.sessionStorage.getItem("Transitioning")) {
		return JSON.parse(window.sessionStorage.getItem("Transitioning"));
	} else {
		return null;
	}
};

export const getShouldTransitionState = () => {
	if (isBrowser() && window.sessionStorage.getItem("Should Transition")) {
		return JSON.parse(window.sessionStorage.getItem("Should Transition"));
	} else {
		return null;
	}
};

export const getMenu = () => {
	if (isBrowser() && window.sessionStorage.getItem("Menu")) {
		return JSON.parse(window.sessionStorage.getItem("Menu"));
	} else {
		return null;
	}
};

export const setUserStorage = (user) =>
	isBrowser()
		? window.sessionStorage.setItem("User", JSON.stringify(user))
		: null;

export const setProfileStorage = (profile) =>
	isBrowser()
		? window.sessionStorage.setItem("Profile", JSON.stringify(profile))
		: null;

export const setTransitionStorage = (transitionState) =>
	isBrowser()
		? window.sessionStorage.setItem(
				"Transitioning",
				JSON.stringify(transitionState)
		  )
		: null;

export const setShouldTransitionStorage = (shouldTransitionState) =>
	isBrowser()
		? window.sessionStorage.setItem(
				"Should Transition",
				JSON.stringify(shouldTransitionState)
		  )
		: null;

export const setMenu = (selection) =>
	isBrowser()
		? window.sessionStorage.setItem("Menu", JSON.stringify(selection))
		: null;

export const handleLogin = (user) => {
	if (isBrowser()) {
		setUserStorage(user);
		setProfileStorage(user);
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
		window.location.href = "/odin-book-v2";
	} else {
		return null;
	}
};
