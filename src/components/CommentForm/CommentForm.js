import React, { useContext } from "react";
import styles from "./CommentForm.module.css";
import { PostContext } from "../../contexts/PostContext";
import { selectUser } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext";

const CommentForm = () => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const history = useHistory();
	const { postId, setPost } = useContext(PostContext);

	const validate = ({ text }) => {
		if (!text || text.length > 250) {
			return false;
		} else {
			return true;
		}
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		console.log(postId);
		const commentData = {
			postId: postId[postId.length - 1],
			text: e.target.previousElementSibling.children[0].children[1].value.trim(),
			user: user._id,
		};
		if (validate(commentData)) {
			fetch("/api/new-comment", {
				method: "POST",
				mode: "same-origin",
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
						history.push("/dashboard");
					} else {
						setMessage({
							title: "Something went wrong",
							body: "It's not immediately clear what happened",
							href: "/comment",
							linkName: "Try Again",
						});
						history.push("/error");
					}
				})
				.catch((error) => {
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/comment",
						linkName: "Try Again",
					});
					history.push("/error");
				});
		} else {
			setMessage({
				title: "Validation failed",
				body: "Comments must include text which must be 250 characters or less",
				href: "/comment",
				linkName: "Try Again",
			});
			history.push("/error");
		}
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
					<textarea
						placeholder={"250 characters or less..."}
						id={styles.postInput}
						type="text"
					/>
				</div>
			</div>
			<button className={styles.btn} onClick={(e) => handleCommentSubmit(e)}>
				Create Comment
			</button>
		</form>
	);
};

export default CommentForm;
