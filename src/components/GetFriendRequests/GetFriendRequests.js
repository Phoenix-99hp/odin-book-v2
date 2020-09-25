import React, { useEffect, useState, useContext } from "react";
import styles from "./GetFriendRequests.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../redux/slices/userSlice";
import { setProfile } from "../../redux/slices/profileSlice";
import { setUserStorage, setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";
import Link from "../Link/Link.js";
import { useMediaQuery } from "react-responsive";
import { ErrorContext } from "../../contexts/ErrorContext";

const GetFriendRequests = () => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();
	const [frs, setFrs] = useState([]);
	const removeAvatar = useMediaQuery({ query: "(max-width: 515px)" });

	const acceptFr = (e) => {
		e.preventDefault();
		const requestToAccept = {
			request:
				e.target.parentElement.previousElementSibling.children[1].textContent,
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
					window.location.reload();
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/fr-view",
						linkName: "Try Again",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/fr-view",
					linkName: "Try Again",
				});
				history.push("/error");
			});
	};

	const declineFr = (e) => {
		e.preventDefault();
		const requestToDecline = {
			request:
				e.target.parentElement.previousElementSibling.children[1].textContent,
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
					window.location.reload();
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/fr-view",
						linkName: "Try Again",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/fr-view",
					linkName: "Try Again",
				});
				history.push("/error");
			});
	};

	useEffect(() => {
		fetch(
			`https://salty-mesa-94052.herokuapp.com/api/friend-request/${user._id}`,
			{
				method: "GET",
				mode: "cors",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					setFrs(response);
				} else {
					return;
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/fr-view",
					linkName: "View Friend Requests",
				});
				history.push("/error");
			});
	}, []);

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
					dispatch(setProfile(response));
					setProfileStorage(response);
					history.push("/profile");
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/fr-view",
						linkName: "View Friend Requests",
					});
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/fr-view",
					linkName: "View Friend Requests",
				});
				history.push("/error");
			});
	};

	return frs[0] ? (
		frs.map((fr, index) => (
			<div className={styles.fr} key={index}>
				<div className={styles.avatarUsername}>
					{fr.avatar ? (
						<img
							id={styles.avatar}
							src={
								removeAvatar
									? ""
									: "data:image/jpeg;base64," +
									  btoa(
											String.fromCharCode(
												...new Uint8Array(fr.avatar.data.data)
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
					<Link
						id={styles.frUsername}
						click={() => handleSetProfile(fr.username)}
						name={fr.username}
					/>
				</div>
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
		<span id={styles.noFriendReqs}>
			There are no friend requests for you to accept at this time.
		</span>
	);
};

export default GetFriendRequests;
