import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./Comments.module.css";
import moment from "moment";
import { PostContext } from "../../contexts/PostContext";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setProfile } from "../../redux/slices/profileSlice";
import { selectUser } from "../../redux/slices/userSlice";
import { setProfileStorage } from "../../services/auth";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner.js";

const Comments = ({ post, clickableUser }) => {
	// const [spinner, setSpinner] = useState(false);
	const user = useSelector(selectUser);
	const profile = useSelector(selectProfile);
	const dispatch = useDispatch();
	const history = useHistory();
	const { postId, setPost } = useContext(PostContext);
	const [spinner, setSpinner] = useState(false);

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

	useEffect(() => {
		setSpinner(true);
		setTimeout(() => {
			setSpinner(false);
		}, 2000);
	}, [postId]);

	return spinner ? (
		<div
			className={`${styles.hide} ${
				postId.includes(post._id) ? styles.show : null
			}`}
		>
			<Spinner />
		</div>
	) : post.comments[0] ? (
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
							<img
								className={`${styles.commentAvatar} ${
									user.username === comment.user.username && !clickableUser
										? styles.notClickable
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
									handleSetProfile(e.target.nextElementSibling.textContent);
								}}
							/>
							<button
								className={`${styles.username} ${
									user.username === comment.user.username && !clickableUser
										? styles.notClickable
										: null
								}`}
								onClick={(e) => {
									handleSetProfile(e.target.textContent);
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
		<div className={`${styles.commentContainer} ${styles.noComments}`}>
			This post has not received any comments.
		</div>
	);
};

export default Comments;
