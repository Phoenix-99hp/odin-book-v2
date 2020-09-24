import React, { useEffect, useState } from "react";
import styles from "./ActionBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setFriendRequests } from "../../redux/slices/userSlice";
import { logout, setUserStorage, setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";
import { setProfile } from "../../redux/slices/profileSlice.js";

const ActionBar = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<div id={styles.actionBarContainer}>
			<button
				id={styles.userListBtn}
				className={styles.btn}
				onClick={() => history.push("/dashboard")}
			>
				Feed
			</button>
			<button
				id={styles.userListBtn}
				className={styles.btn}
				onClick={() => {
					setProfileStorage(user);
					if (window.location.pathname === "/profile") {
						window.location.reload();
					} else {
						history.push("/profile");
					}
				}}
			>
				Profile
			</button>
			<button
				id={styles.userListBtn}
				className={styles.btn}
				onClick={() => history.push("/user-list")}
			>
				Users List
			</button>
			<button
				id={styles.addFriendBtn}
				className={styles.btn}
				onClick={() => history.push("/fr-send")}
			>
				Add Friends
			</button>
			<button
				id={styles.friendRequestsBtn}
				className={styles.btn}
				onClick={() => history.push("/fr-view")}
			>
				Friend Requests{" "}
				<span id={styles.frNumber}>{user.friendRequests.length}</span>
			</button>
			<button className={styles.btn} onClick={() => history.push("/post")}>
				Write Post
			</button>
			<button
				id={styles.logoutBtn}
				className={styles.btn}
				onClick={() => logout()}
			>
				Logout
			</button>
		</div>
	);
};

export default ActionBar;
