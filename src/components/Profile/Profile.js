import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./Profile.module.css";
import Comments from "../Comments/Comments.js";
import Like from "../Like/Like.js";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { selectProfile, setProfile } from "../../redux/slices/profileSlice";
import { useHistory } from "react-router-dom";
import { setProfileStorage } from "../../services/auth";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
	const user = useSelector(selectUser);
	const profile = useSelector(selectProfile);
	const history = useHistory();
	const dispatch = useDispatch();
	const [alreadySentFr, setAlreadySentFr] = useState(null);
	const [postsToDisplay, setPostsToDisplay] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const removeAvatar = useMediaQuery({ query: "(max-width: 380px)" });

	useEffect(() => {
		fetch(
			`http://localhost:3001/api/friend-request/friends/${profile.username}`,
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
					if (response.friends.includes(user._id)) {
						setAlreadySentFr("friends");
					} else if (response.friendRequests.includes(user._id)) {
						setAlreadySentFr("request");
					} else {
						setAlreadySentFr("null");
					}
				} else {
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				history.push("/error");
			});
	}, [profile, user._id]);

	useEffect(() => {
		fetch(`http://localhost:3001/api/posts/user/${profile.username}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				// if (response) {
				// 	if (response[0]) {
				// 		console.log("USERNAME:", profile.username);
				// 		setPostsToDisplay(response);
				// 	}
				// } else {
				// 	history.push("/error");
				// }
				setPostsToDisplay(response);
			})
			.catch((error) => {
				console.log("catch", error);
				history.push("/error");
			});
	}, [profile]);

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
					console.log(profile, "PROFILE");
					// setToggleShouldUpdate(!toggleShouldUpdate);
				} else {
					console.log("error");
				}
			})
			.catch((error) => {
				console.log("catch profile", error);
				history.push("/error");
			});
	};

	const loadFunc = () => {
		if (postsToDisplay[0]) {
			fetch(
				`http://localhost:3001/api/posts/more/${profile.username}/${
					postsToDisplay[postsToDisplay.length - 1]._id
				}`,
				{
					method: "GET",
					mode: "cors",
				}
			)
				.then((res) => {
					return res.json();
				})
				.then((response) => {
					console.log("posts load func response", response);
					if (response) {
						if (response.hasMore >= 10) {
							setPostsToDisplay([
								...postsToDisplay,
								...response.additionalPosts,
							]);
						} else if (response.additionalPosts[0]) {
							setPostsToDisplay([
								...postsToDisplay,
								...response.additionalPosts,
							]);
							setHasMore(false);
						}
					} else {
						setHasMore(false);
						console.log("no response");
					}
				})
				.catch((error) => {
					console.log("catch load func", error);
					history.push("/error");
				});
		}
	};

	const handleFriendReq = (e) => {
		e.preventDefault();
		const fr = {
			username: profile.username,
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

	window.onscroll = () => {
		if (!hasMore) {
			window.removeEventListener("scroll", this);
		} else if (
			window.innerHeight + window.pageYOffset >=
				document.documentElement.scrollHeight &&
			hasMore
		) {
			loadFunc();
		}
	};

	return (
		<div id={styles.profileContainer}>
			{/* <div id={styles.profileUser}> */}
			<div id={styles.profileInfo}>
				<img
					id={styles.profileImg}
					src={
						"data:image/jpeg;base64," +
						btoa(
							String.fromCharCode(
								...new Uint8Array(profile.profilePicture.data.data)
							)
						)
					}
				/>
				<h1 id={styles.username}>{profile.username}</h1>
				{alreadySentFr === "friends" ? (
					<div id={styles.custom}>
						<span className={styles.kText}>Your friend.</span>
					</div>
				) : alreadySentFr === "request" ? (
					<div id={styles.custom}>
						<span className={styles.kText}>Friend request pending.</span>
					</div>
				) : user.username === profile.username ? (
					<div id={styles.custom}>
						<span className={styles.kText}>It's you!</span>
					</div>
				) : (
					<div id={styles.custom}>
						<button onClick={(e) => handleFriendReq(e)} className={styles.btn}>
							Send Friend Request
						</button>
					</div>
				)}
			</div>
			<div id={styles.container}>
				<div id={styles.postContainer}>
					<h1 id={styles.postsHeading}>
						{profile.username}'s <span id={styles.reg}>posts:</span>
					</h1>
					{postsToDisplay[0] ? (
						postsToDisplay.map((post, index) => {
							return (
								<>
									<div className={styles.pcContainer} key={index}>
										<div className={styles.postContainer}>
											<h1 className={styles.postTitle}>{post.title}</h1>
											<div className={`${styles.pBody} ${styles.space}`}>
												{post.text}
											</div>
											<div className={`${styles.postUser} ${styles.space}`}>
												<img
													onClick={(e) => {
														handleSetProfile(
															e.target.nextElementSibling.textContent
														);
														// history.push("/profile");
													}}
													id={styles.avatar}
													src={
														removeAvatar
															? ""
															: "data:image/jpeg;base64," +
															  btoa(
																	String.fromCharCode(
																		...new Uint8Array(
																			post.user.avatar.data.data
																		)
																		// profile
																	)
															  )
													}
												/>
												<button
													onClick={(e) =>
														handleSetProfile(e.target.textContent)
													}
													className={styles.username}
												>
													{post.user.username}
												</button>
												<span className={styles.timeSpan}>
													({moment(post.timestamp).format("L")})
												</span>
											</div>
											<Like count={post.likes.length} post={post} />
										</div>
									</div>
									<Comments
										// setAlreadySentFr={setAlreadySentFr}
										setPostsToDisplay={setPostsToDisplay}
										post={post}
									/>
									{index === postsToDisplay.length - 1 && !hasMore ? (
										<div id={styles.seenAll}>You've seen them all!</div>
									) : null}
								</>
							);
						})
					) : (
						<div id={styles.noPosts}>There are no posts to display.</div>
					)}
				</div>
			</div>
			<div id={styles.placeholder}></div>
		</div>
	);
};

export default Profile;
