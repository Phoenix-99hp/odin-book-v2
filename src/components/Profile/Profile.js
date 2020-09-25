import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Comments from "../Comments/Comments.js";
import Like from "../Like/Like.js";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { selectProfile } from "../../redux/slices/profileSlice";
import { useHistory } from "react-router-dom";
import { setProfileStorage } from "../../services/auth";
import { useMediaQuery } from "react-responsive";
import { ErrorContext } from "../../contexts/ErrorContext";

const Profile = () => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const profile = useSelector(selectProfile);
	const history = useHistory();
	const [alreadySentFr, setAlreadySentFr] = useState(null);
	const [postsToDisplay, setPostsToDisplay] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const removeAvatar = useMediaQuery({ query: "(max-width: 380px)" });

	useEffect(() => {
		fetch(
			`https://salty-mesa-94052.herokuapp.com/api/friend-request/friends/${profile.username}`,
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
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/dashboard",
						linkName: "Here's a link to your feed",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				history.push("/error");
			});
	}, [profile, user._id]);

	useEffect(() => {
		fetch(
			`https://salty-mesa-94052.herokuapp.com/api/posts/user/${profile.username}`,
			{
				method: "GET",
				mode: "cors",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				setPostsToDisplay(response);
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
					window.location.reload();
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/dashboard",
						linkName: "Here's a link to your feed",
					});
					history.push("/error");
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
	};

	const loadFunc = () => {
		if (postsToDisplay[0]) {
			fetch(
				`https://salty-mesa-94052.herokuapp.com/api/posts/user/more/${
					profile.username
				}/${postsToDisplay[postsToDisplay.length - 1]._id}`,
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
						if (response.hasMore > 0) {
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
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/dashboard",
						linkName: "Here's a link to your feed",
					});
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
						href: "/profile",
						linkName: "Here's a link to the profile you were viewing",
					});
					history.push("/error");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/profile",
					linkName: "Here's a link to the profile you were viewing",
				});
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
		// transitioning ? (
		// 	<TransitionPage />
		// ) : (
		<div id={styles.profileContainer}>
			<div id={styles.profileInfo}>
				{profile.profilePicture ? (
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
				) : (
					<div id={styles.noPicture}>No Picture</div>
				)}
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
												{post.user.avatar ? (
													<img
														className={
															profile.username === post.user.username
																? styles.notClickable
																: null
														}
														onClick={(e) => {
															handleSetProfile(
																e.target.nextElementSibling.textContent
															);
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
																		)
																  )
														}
													/>
												) : (
													<div
														id={styles.noAvatar}
														className={`${styles.noAvatar} ${
															profile.username === post.user.username
																? styles.notClickable
																: null
														}`}
													>
														No Avatar
													</div>
												)}
												<button
													onClick={(e) =>
														handleSetProfile(e.target.textContent)
													}
													className={`${styles.username} ${
														profile.username === post.user.username
															? styles.notClickable
															: null
													}`}
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
										page={"profile"}
										// clickableUser={false}
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
