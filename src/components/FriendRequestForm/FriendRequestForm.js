import React from "react";
import styles from "./FriendRequestForm.module.css";
import { selectUser } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const FriendRequestForm = () => {
	const user = useSelector(selectUser);
	const history = useHistory();

	const handleFriendReq = (e) => {
		e.preventDefault();
		const friendReqUsername = e.target.previousElementSibling.children[1].value;
		const fr = {
			username: friendReqUsername,
			currentUser: user._id,
		};
		fetch("http://localhost:3001/api/friend-request", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fr),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					history.push("/dashboard");
				} else {
					console.log("no response");
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				history.push("/error");
			});
	};

	return (
		<form id={styles.friendReqForm}>
			<button
				id={styles.closeModalBtn}
				onClick={() => history.push("/dashboard")}
			>
				x
			</button>
			<h3 id={styles.heading}>Friend Request</h3>
			<div className={styles.formGroup}>
				<label id={styles.usernameLabel}>Username:</label>
				<input id={styles.friendReqInput} type="text" />
			</div>
			<button className={styles.btn} onClick={(e) => handleFriendReq(e)}>
				Send Request
			</button>
		</form>
	);
};

export default FriendRequestForm;
