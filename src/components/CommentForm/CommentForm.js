import React, { useContext } from "react";
import styles from "./CommentForm.module.css";
import { PostContext } from "../../contexts/PostContext";
import { selectUser } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CommentForm = () => {
	const user = useSelector(selectUser);
	const history = useHistory();
	const { postId, setPost } = useContext(PostContext);

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		console.log(postId);
		const commentData = {
			postId: postId[postId.length - 1],
			text: e.target.previousElementSibling.children[0].children[1].value,
			user: user._id,
		};
		fetch("http://localhost:3001/api/new-comment", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(commentData),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response, "comment response");
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

	return (
		<form id={styles.commentForm}>
			<button
				id={styles.closeModalBtn}
				onClick={() => history.push("/dashboard")}
			>
				x
			</button>
			<h3 id={styles.heading}>Write Comment</h3>
			<div id={styles.fieldContainer}>
				<div className={styles.formGroup}>
					<label id={styles.cBodyLabel}>Comment:</label>
					<textarea id={styles.postInput} type="text" />
				</div>
			</div>
			<button className={styles.btn} onClick={(e) => handleCommentSubmit(e)}>
				Create Comment
			</button>
		</form>
	);
};

export default CommentForm;
