import React, { useContext } from "react";
import styles from "./FriendRequestForm.module.css";
import { selectUser } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext";

const FriendRequestForm = () => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const history = useHistory();

	const validate = ({ username }) => {
		const trimmed = username.trim();
		if (!trimmed || trimmed.length > 30) {
			return false;
		} else {
			return true;
		}
	};

	const handleFriendReq = (e) => {
		e.preventDefault();
		const friendReqUsername = e.target.previousElementSibling.children[1].value;
		const fr = {
			username: friendReqUsername,
			currentUser: user._id,
		};
		if (validate(fr)) {
			fetch("https://salty-mesa-94052.herokuapp.com/api/friend-request", {
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
						window.location.reload();
					} else {
						setMessage({
							title: "Something went wrong",
							body:
								"Make sure you entered an existing username, and that you haven't already sent this user a friend request",
							href: "/odin-book-v2/fr-send",
							linkName: "Try Again",
						});
						history.push("/error");
					}
				})
				.catch((error) => {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/odin-book-v2/fr-send",
						linkName: "Try Again",
					});
					history.push("/error");
				});
		} else {
			setMessage({
				title: "Validation failed",
				body: "The username you entered does not exist",
				href: "/odin-book-v2/fr-send",
				linkName: "Try Again",
			});
			history.push("/error");
		}
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
