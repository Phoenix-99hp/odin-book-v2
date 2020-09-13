import React, { useEffect, useState } from "react";
import styles from "./GetFriendRequests.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../redux/slices/userSlice";
import { setProfile } from "../../redux/slices/profileSlice";
import { setUserStorage, setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";
import Link from "../Link/Link.js";

const GetFriendRequests = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();
	const [frs, setFrs] = useState([]);

	const acceptFr = (e) => {
		e.preventDefault();
		const requestToAccept = {
			request: e.target.parentElement.previousElementSibling.textContent,
		};
		fetch(`http://localhost:3001/api/friend-request/${user._id}/accept`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestToAccept),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					dispatch(setUser(response));
					setUserStorage(response);
					// setFrs(response.friendRequests);
					// window.location.reload();
					// setFrs(response);
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

	const declineFr = (e) => {
		e.preventDefault();
		const requestToDecline = {
			request: e.target.parentElement.previousElementSibling.textContent,
		};
		fetch(`http://localhost:3001/api/friend-request/${user._id}/decline`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestToDecline),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					dispatch(setUser(response));
					setUserStorage(response);
					// setFrs(response.friendRequests);
					// window.location.reload();
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
					console.log(response);
					setFrs(response);
				} else {
					console.log("no response");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				history.push("/error");
			});
	}, []);

	const handleSetProfile = (username) => {
		fetch(`http://localhost:3001/api/profile/${username}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					dispatch(setProfile(response));
					setProfileStorage(response);
					history.push("/profile");
				} else {
					console.log("error");
				}
			})
			.catch((error) => {
				console.log("catch profile", error);
				history.push("/error");
			});
	};

	return frs[0] ? (
		frs.map((fr, index) => (
			<div className={styles.fr} key={index}>
				<img
					id={styles.avatar}
					src={
						"data:image/jpeg;base64," +
						btoa(String.fromCharCode(...new Uint8Array(fr.avatar.data.data)))
					}
				/>
				<Link
					id={styles.frUsername}
					click={() => handleSetProfile(fr.username)}
					name={fr.username}
				/>
				<div className={styles.btnContainer}>
					<button
						id={styles.acceptBtn}
						className={styles.btn}
						onClick={(e) => acceptFr(e)}
					>
						Accept
					</button>
					<button
						id={styles.declineBtn}
						className={styles.btn}
						onClick={(e) => declineFr(e)}
					>
						Decline
					</button>
				</div>
			</div>
		))
	) : (
		<span>There are no friend requests for you to accept at this time.</span>
	);
};

export default GetFriendRequests;
