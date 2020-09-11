import React, { useContext } from "react";
import { setProfileStorage } from "../../services/auth";
import { selectUser } from "../../redux/slices/userSlice.js";
import styles from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../../redux/slices/profileSlice.js";
import { useHistory } from "react-router-dom";

const Nav = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<nav id={styles.nav}>
			<button
				className={styles.navItem}
				onClick={() => {
					dispatch(setProfile(user));
					setProfileStorage(user);
					history.push("/profile");
				}}
			>
				Your Profile
			</button>
			<button
				className={styles.navItem}
				onClick={() => {
					history.push("/dashboard");
				}}
			>
				Dashboard
			</button>
		</nav>
	);
};

export default Nav;
