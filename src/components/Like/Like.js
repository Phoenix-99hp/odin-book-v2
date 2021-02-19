import React, { useState, useEffect, useContext } from "react";
import styles from "./Like.module.css";
import { PostContext } from "../../contexts/PostContext";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext";
// import { CommentSpinnerContext } from "../../contexts/CommentSpinnerContext";

const Like = ({ count, post }) => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const history = useHistory();
	const [likeCount, setLikeCount] = useState(count);
	const [userLiked, setUserLiked] = useState(false);
	const { postId, setPost } = useContext(PostContext);
	// const [spinner, setSpinner] = useState(false);
	// const [comments, showComments] = useState(false);
	// const { setCommentSpinner } = useContext(CommentSpinnerContext);

	useEffect(() => {
		fetch(`/api/posts/user-like/${user._id}/${post._id}`, {
			method: "GET",
			mode: "same-origin",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					setUserLiked(response);
				} else {
					console.log("no posts to display");
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

	// useEffect(() => {
	// 	setSpinner(true);
	// 	setTimeout(() => {
	// 		setSpinner(false);
	// 	}, 2000);
	// }, [comments]);

	const handleLike = (e) => {
		e.preventDefault();
		const likeUnlike = e.target.textContent;
		const data = {
			likeUnlike: likeUnlike,
			likes: null,
			currentUser: user._id,
		};
		if (likeUnlike === "Like") {
			data.likes = likeCount + 1;
		} else {
			data.likes = likeCount - 1;
		}
		fetch(`/api/posts/like/${post._id}`, {
			method: "POST",
			mode: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response && likeUnlike === "Like") {
					console.log(response);
					setLikeCount(response);
					setUserLiked(true);
				} else {
					console.log(response);
					setLikeCount(response);
					setUserLiked(false);
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

	const handleShowHideComments = (e) => {
		if (e.target.textContent === "Show Comments") {
			setPost([...postId, post._id]);
			// setCommentSpinner(true);
		} else if (e.target.textContent === "Hide Comments") {
			setPost(postId.filter((val, index) => val !== post._id));
		}
	};

	return (
		<div className={styles.likeContainer}>
			<button
				className={`${styles.btn} ${styles.showComments}`}
				onClick={(e) => handleShowHideComments(e)}
			>
				{postId.includes(post._id) ? "Hide Comments" : "Show Comments"}
			</button>
			<button
				className={styles.btn}
				onClick={() => {
					setPost([...postId, post._id]);
					history.push("/comment");
				}}
			>
				Comment
			</button>
			<div id={styles.likesContainer}>
				<button
					disabled={post.user._id === user._id ? true : false}
					className={`${styles.btn} ${styles.likeUnlike}`}
					onClick={(e) => handleLike(e)}
				>
					{userLiked ? "Un-Like" : "Like"}
				</button>
				<span
					id={styles.likeSpan}
					className={userLiked ? styles.userLiked : styles.regular}
				>
					{likeCount}
				</span>
			</div>
		</div>
	);
};

export default Like;
