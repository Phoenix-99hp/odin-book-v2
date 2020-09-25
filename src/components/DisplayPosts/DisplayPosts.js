import React, { useState, useEffect, useContext } from "react";
import styles from "./DisplayPosts.module.css";
import moment from "moment";
import Like from "../Like/Like.js";
import Comments from "../Comments/Comments.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { setProfile } from "../../redux/slices/profileSlice";
import { setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ErrorContext } from "../../contexts/ErrorContext";

const DisplayPosts = () => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();
	const [postsToDisplay, setPostsToDisplay] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const removeAvatar = useMediaQuery({ query: "(max-width: 380px)" });

	useEffect(() => {
		fetch(`https://salty-mesa-94052.herokuapp.com/api/posts/${user._id}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response, "POSTS");
					setPostsToDisplay(response);
				} else {
					console.log("no posts to display");
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/odin-book-v2/dashboard",
					linkName: "Here's a link to your feed",
				});
				history.push("/error");
			});
	}, []);

	const loadFunc = () => {
		console.log("LOAD", postsToDisplay[0]);
		if (postsToDisplay[0]) {
			fetch(
				`https://salty-mesa-94052.herokuapp.com/api/posts/more/${user._id}/${
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
					console.log("RES", response);
					if (response) {
						if (response.hasMore > 0) {
							setPostsToDisplay([
								...postsToDisplay,
								...response.additionalPosts,
							]);
							console.log(response.additionalPosts, "POSTS ADD1");
						} else if (response.additionalPosts[0]) {
							setPostsToDisplay([
								...postsToDisplay,
								...response.additionalPosts,
							]);
							console.log(response.additionalPosts, "POSTS ADD2");
							setHasMore(false);
						}
					} else {
						setHasMore(false);
						console.log("no more");
					}
				})
				.catch((error) => {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/odin-book-v2/dashboard",
						linkName: "Here's a link to your feed",
					});
					history.push("/error");
				});
		}
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
					dispatch(setProfile(response));
					setProfileStorage(response);
					history.push("/profile");
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/odin-book-v2/dashboard",
						linkName: "Here's a link to your feed",
					});
				}
			})
			.catch((error) => {
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/odin-book-v2/dashboard",
					linkName: "Here's a link to your feed",
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
		<div id={styles.profileContainer}>
			<div id={styles.profileInfo}></div>
			<div id={styles.container}>
				<div id={styles.postContainer}>
					<h1 id={styles.postsHeading}>Your Custom Feed:</h1>
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
														onClick={(e) => {
															handleSetProfile(
																e.target.nextElementSibling.textContent
															);
														}}
														id={styles.noAvatar}
													>
														No Avatar
													</div>
												)}
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
										page={"dashboard"}
										// clickableUser={true}
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
						<div id={styles.noPosts}>
							Your feed is empty. Write posts or add friends to liven it up!
						</div>
					)}
				</div>
			</div>
			<div id={styles.placeholder}></div>
		</div>
	);
};

export default DisplayPosts;
