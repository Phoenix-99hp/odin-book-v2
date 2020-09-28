import React, { useEffect, useState, useContext } from "react";
import styles from "./UserList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../redux/slices/userSlice";
import { setProfile } from "../../redux/slices/profileSlice";
import { setUserStorage, setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ErrorContext } from "../../contexts/ErrorContext";

const UserList = () => {
	const user = useSelector(selectUser);
	const { setMessage } = useContext(ErrorContext);
	const dispatch = useDispatch();
	const history = useHistory();
	const [users, setUsers] = useState([]);
	const removeAvatar = useMediaQuery({ query: "(max-width: 515px)" });

	useEffect(() => {
		fetch(`https://salty-mesa-94052.herokuapp.com/api/all-users/${user._id}`, {
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
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/dashboard",
					linkName: "Here's a link to your feed",
				});
				history.push("/error");
			});
	}, []);

	const acceptFr = (e) => {
		e.preventDefault();
		const requestToAccept = {
			request: users[e.target.parentElement.dataset.index].username,
		};
		fetch(
			`https://salty-mesa-94052.herokuapp.com/api/friend-request/${user._id}/accept`,
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestToAccept),
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					dispatch(setUser(response));
					setUserStorage(response);
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/user-list",
						linkName: "Try Again",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/user-list",
					linkName: "Try Again",
				});
				history.push("/error");
			});
	};

	const declineFr = (e) => {
		e.preventDefault();
		const requestToDecline = {
			request: users[e.target.parentElement.dataset.index].username,
		};
		fetch(
			`https://salty-mesa-94052.herokuapp.com/api/friend-request/${user._id}/decline`,
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestToDecline),
			}
		)
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
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/user-list",
						linkName: "Try Again",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/user-list",
					linkName: "Try Again",
				});
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
						body: "It's not immediately clear what happened",
						href: "/user-list",
						linkName: "Try Again",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/user-list",
					linkName: "Try Again",
				});
				history.push("/error");
			});
	};

	const handleRemoveFriend = (e) => {
		e.preventDefault();
		const friendToRemove =
			e.target.parentElement.previousElementSibling.children[1].textContent;
		fetch(
			`https://salty-mesa-94052.herokuapp.com/api/friends/${user._id}/${friendToRemove}/`,
			{
				method: "PUT",
				mode: "cors",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					// dispatch(setUser(response));
					setUserStorage(response);
					window.location.reload();
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/user-list",
						linkName: "Try Again",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/user-list",
					linkName: "Try Again",
				});
				history.push("/error");
			});
	};

	const handleSetProfile = (username) => {
		fetch(`https://salty-mesa-94052.herokuapp.com/api/profile/${username}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					setProfileStorage(response);
					dispatch(setProfile(response));
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/user-list",
						linkName: "Try Again",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/user-list",
					linkName: "Try Again",
				});
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
						<div id={styles.outline}>
							<div id={styles.avatarUsername}>
								{individual.avatar ? (
									<img
										onClick={(e) => {
											handleSetProfile(e.target.nextElementSibling.textContent);
											history.push("/profile");
										}}
										className={styles.avatar}
										src={
											removeAvatar
												? ""
												: "data:image/jpeg;base64," +
												  btoa(
														String.fromCharCode(
															...new Uint8Array(individual.avatar.data.data)
														)
												  )
										}
									/>
								) : (
									<div
										id={removeAvatar ? styles.hide : styles.noAvatar}
										onClick={(e) => {
											handleSetProfile(e.target.nextElementSibling.textContent);
											history.push("/profile");
										}}
									>
										No Avatar
									</div>
								)}
								<button
									className={styles.username}
									onClick={(e) => {
										handleSetProfile(e.target.textContent);
										history.push("/profile");
									}}
								>
									{individual.username}
								</button>
							</div>
							{individual.friendRequests.includes(user._id) ? (
								<div className={styles.btnContainer} data-index={index}>
									<span id={styles.pendingFr}>Friend request pending...</span>
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
					</div>
				))
			) : (
				<div id={styles.noUsers}>
					There are currently no other users registered.
				</div>
			)}
		</div>
	);
};

export default UserList;
