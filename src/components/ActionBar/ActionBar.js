import React, { useEffect, useState } from "react";
import FriendRequests from "../FriendRequests/FriendRequests.js";
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

	useEffect(() => {
		fetch(`http://localhost:3001/api/friend-request/${user._id}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					if (response[0]) {
						console.log(response);
						dispatch(setFriendRequests(response));
						setUserStorage(user);
					}
				} else {
					console.log("no response");
					return;
				}
			})
			.catch((error) => {
				console.log("catch", error);
				history.push("/error");
			});
	}, []);

	return (
		<div id={styles.actionBarContainer}>
			<button
				id={styles.userListBtn}
				className={styles.btn}
				onClick={() => history.push("/dashboard")}
			>
				Dashboard
			</button>
			<button
				id={styles.userListBtn}
				className={styles.btn}
				onClick={() => {
					dispatch(setProfile(user));
					setProfileStorage(user);
					history.push("/profile");
				}}
			>
				Your Profile
			</button>
			<button
				id={styles.userListBtn}
				className={styles.btn}
				onClick={() => history.push("/user-list")}
			>
				User List
			</button>
			<button
				id={styles.addFriendBtn}
				className={styles.btn}
				onClick={() => history.push("/fr-send")}
			>
				Add Friends
			</button>
			<FriendRequests requests={user.friendRequests} />
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
