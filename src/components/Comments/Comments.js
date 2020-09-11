import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./Comments.module.css";
import moment from "moment";
import { PostContext } from "../../contexts/PostContext";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setProfile } from "../../redux/slices/profileSlice";
import { setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";

const Comments = ({ post }) => {
	// const [spinner, setSpinner] = useState(false);
	const profile = useSelector(selectProfile);
	const dispatch = useDispatch();
	const history = useHistory();
	const { postId, setPost } = useContext(PostContext);
	// const currentUser = getUser();

	// useEffect(() => {
	//     setSpinner(true)
	//     setTimeout(() => {
	//         setSpinner(false)
	//     }, 1000)
	// }, [postId])

	// spinner && postId.includes(post._id) ? (
	//     <div id={styles.spinnerContainer}>
	//         <Spinner />
	//     </div>
	// ) :

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
					history.push("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				history.push("/error");
			});
	};

	return (
		<div
			className={`${styles.hide} ${
				postId.includes(post._id) ? styles.show : null
			}`}
		>
			{post.comments[0] ? (
				post.comments.map((comment, index) => {
					return (
						<div className={styles.commentContainer} key={index}>
							<div className={`${styles.space} ${styles.text}`}>
								{comment.text}
							</div>
							<div className={styles.commentUser}>
								<img
									className={styles.commentAvatar}
									src={
										"data:image/jpeg;base64," +
										btoa(
											String.fromCharCode(
												...new Uint8Array(comment.user.avatar.data.data)
											)
										)
									}
									onClick={(e) => {
										handleSetProfile(e.target.nextElementSibling.textContent);
										// setPost(post._id);
									}}
								/>
								<button
									className={styles.username}
									onClick={(e) => {
										handleSetProfile(e.target.textContent);
										// setPost(post._id);
									}}
								>
									{comment.user.username}
								</button>
								<span className={styles.timeSpan}>
									({moment(comment.timestamp).format("L")})
								</span>
							</div>
						</div>
					);
				})
			) : (
				<div className={styles.commentContainer}>
					This post has not received any comments.
				</div>
			)}
		</div>
	);
};

export default Comments;
