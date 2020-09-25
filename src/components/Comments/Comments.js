import React, { useContext, useState, useEffect } from "react";
import styles from "./Comments.module.css";
import moment from "moment";
import { PostContext } from "../../contexts/PostContext";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setProfile } from "../../redux/slices/profileSlice";
import { selectUser } from "../../redux/slices/userSlice";
import { setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext";
// import Spinner from "../Spinner/Spinner.js";
// import { CommentSpinnerContext } from "../../contexts/CommentSpinnerContext";

const Comments = ({ post, clickableUser, page }) => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const profile = useSelector(selectProfile);
	const dispatch = useDispatch();
	const history = useHistory();
	const { postId, setPost } = useContext(PostContext);

	// const [spinner, setSpinner] = useState(false);
	// const { commentSpinner } = useContext(CommentSpinnerContext);

	const handleSetProfile = (username, pg) => {
		fetch(`https://salty-mesa-94052.herokuapp.com/api/profile/${username}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response && pg === "profile") {
					// dispatch(setProfile(response));
					setProfileStorage(response);
					window.location.reload();
					// history.push("/profile");
				} else if (response) {
					// dispatch(setProfile(response));
					setProfileStorage(response);
					history.push("/profile");
				} else {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/odin-book-v2/dashboard",
						linkName: "Here's a link to your feed",
					});
					history.push("/odin-book-v2/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				setMessage({
					title: "Something went wrong",
					body: "It's not immediately clear what happened",
					href: "/odin-book-v2/dashboard",
					linkName: "Here's a link to your feed",
				});
				history.push("/odin-book-v2/error");
			});
	};

	// useEffect(() => {
	// 	setSpinner(true);
	// 	setTimeout(() => {
	// 		setSpinner(false);
	// 	}, 2000);
	// }, [postId]);

	return (
		//  commentSpinner ?

		// 	// <div
		// 	// 	className={`${styles.hide} ${
		// 	// 		postId.includes(post._id) ? styles.show : null
		// 	// 	}`}</div>
		// 	// >
		// 	<Spinner />
		// // ) : //
		post.comments[0] ? (
			post.comments.map((comment, index) => {
				return (
					<div
						className={`${styles.hide} ${
							postId.includes(post._id) ? styles.show : null
						}`}
					>
						<div className={styles.commentContainer} key={index}>
							<div className={`${styles.space} ${styles.text}`}>
								{comment.text}
							</div>
							<div className={styles.commentUser}>
								{post.user.avatar ? (
									<img
										className={`${styles.commentAvatar} ${
											page === "profile" &&
											profile.username === comment.user.username
												? // &&
												  // !clickableUser
												  styles.notClickable
												: null
										}`}
										src={
											"data:image/jpeg;base64," +
											btoa(
												String.fromCharCode(
													...new Uint8Array(comment.user.avatar.data.data)
												)
											)
										}
										onClick={(e) => {
											handleSetProfile(
												e.target.nextElementSibling.textContent,
												page
											);
										}}
									/>
								) : (
									<div
										className={`${styles.noAvatar} ${
											page === "profile" &&
											profile.username === comment.user.username
												? styles.notClickable
												: null
										}`}
									>
										No Avatar
									</div>
								)}
								<button
									className={`${styles.username} ${
										page === "profile" &&
										profile.username === comment.user.username
											? // &&
											  // !clickableUser
											  styles.notClickable
											: null
									}`}
									onClick={(e) => {
										handleSetProfile(e.target.textContent, page);
									}}
								>
									{comment.user.username}
								</button>
								<span className={styles.timeSpan}>
									({moment(comment.timestamp).format("L")})
								</span>
							</div>
						</div>
					</div>
				);
			})
		) : (
			<div
				className={`${styles.hide} ${
					postId.includes(post._id) ? styles.show : null
				}`}
			>
				<div className={`${styles.commentContainer} ${styles.noComments}`}>
					This post has not received any comments.
				</div>
			</div>
		)
	);
};

export default Comments;
