import React, { useEffect, useState, useContext } from "react";
import styles from "./UserList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../redux/slices/userSlice";
import { selectProfile, setProfile } from "../../redux/slices/profileSlice";
import { setUserStorage, setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";

const UserList = () => {
	const user = useSelector(selectUser);
	const profile = useSelector(selectProfile);
	const dispatch = useDispatch();
	const history = useHistory();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:3001/api/all-users/${user._id}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					setUsers(response);
				} else {
					console.log("no response");
					// window.location.href = "/error";
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				// window.location.href = "/error";
				history.push("/error");
			});
	}, []);

	const acceptFr = (e) => {
		e.preventDefault();
		const requestToAccept = {
			request: users[e.target.parentElement.dataset.index].username,
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
					// window.location.reload();
				} else {
					console.log("no response");
					// window.location.href = "/error";
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				// window.location.href = "/error";
				history.push("/error");
			});
	};

	const declineFr = (e) => {
		e.preventDefault();
		const requestToDecline = {
			request: users[e.target.parentElement.dataset.index].username,
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
					// window.location.reload();
				} else {
					console.log("no response");
					// window.location.href = "/error";
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				// window.location.href = "/error";
				history.push("/error");
			});
	};

	const handleFriendReq = (e) => {
		e.preventDefault();
		const friendReqUsername =
			users[e.target.parentElement.dataset.index].username;
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
					//   navigate("/dashboard")
					// window.location.reload();
				} else {
					console.log("no response");
					// window.location.href = "/error";
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				// window.location.href = "/error";
				history.push("/error");
			});
	};

	const handleRemoveFriend = (e) => {
		e.preventDefault();
		const friendToRemove =
			e.target.parentElement.previousElementSibling.textContent;
		fetch(`http://localhost:3001/api/friends/${user._id}/${friendToRemove}/`, {
			method: "PUT",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					dispatch(setUser(response));
					setUserStorage(response);
					// window.location.reload();
					// setUsers(response);
				} else {
					console.log("no response");
					// window.location.href = "/error";
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				// window.location.href = "/error";
				history.push("/error");
			});
	};

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
				} else {
					// window.location.href = "/error";
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch profile", error);
				// window.location.href = "/error";
				history.push("/error");
			});
	};

	return (
		<div id={styles.userContainer}>
			<button
				id={styles.closeModalBtn}
				onClick={() => history.push("/dashboard")}
			>
				x
			</button>
			<h3 id={styles.heading}>Users List</h3>
			{users[0] ? (
				users.map((individual, index) => (
					<div className={styles.fr} key={index}>
						<img
							className={styles.avatar}
							src={
								"data:image/jpeg;base64," +
								btoa(
									String.fromCharCode(
										...new Uint8Array(individual.avatar.data.data)
									)
								)
							}
						/>
						<button
							className={styles.username}
							onClick={(e) => {
								handleSetProfile(e.target.textContent);
								history.push("/profile");
							}}
						>
							{individual.username}
						</button>
						{individual.friendRequests.includes(user._id) ? (
							<div className={styles.btnContainer} data-index={index}>
								<span>Friend request pending...</span>
							</div>
						) : user.friendRequests.includes(individual._id) ? (
							<div className={styles.btnContainer} data-index={index}>
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
						) : user.friends.includes(individual._id) ? (
							<div className={styles.btnContainer} data-index={index}>
								<button
									className={styles.btn}
									onClick={(e) => handleRemoveFriend(e)}
								>
									Remove Friend
								</button>
							</div>
						) : (
							<div className={styles.btnContainer} data-index={index}>
								<button
									className={styles.btn}
									onClick={(e) => handleFriendReq(e)}
								>
									Send Friend Request
								</button>
							</div>
						)}
					</div>
				))
			) : (
				<div id={styles.friendReqForm}>
					There are currently no other users registered.
				</div>
			)}
		</div>
	);
};

export default UserList;
