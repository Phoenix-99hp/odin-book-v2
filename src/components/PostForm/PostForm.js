import React, { useContext } from "react";
import styles from "./PostForm.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice.js";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext";

const PostForm = () => {
	const { setMessage } = useContext(ErrorContext);
	const user = useSelector(selectUser);
	const history = useHistory();

	const validate = ({ title, text }) => {
		if (!title || !text || title.length > 50 || text.length > 500) {
			return false;
		} else {
			return true;
		}
	};

	const handlePostSubmit = (e) => {
		e.preventDefault();
		const postData = {
			title: e.target.previousElementSibling.children[0].children[1].value.trim(),
			text: e.target.previousElementSibling.children[1].children[1].value.trim(),
			user: user._id,
		};
		if (validate(postData)) {
			fetch("https://salty-mesa-94052.herokuapp.com/api/new-post", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
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
							href: "/post",
							linkName: "Try Again",
						});
						history.push("/error");
					}
				})
				.catch((error) => {
					console.log("catch", error);
					setMessage({
						title: "Something went wrong",
						body: "It's not immediately clear what happened",
						href: "/post",
						linkName: "Try Again",
					});
					history.push("/error");
				});
		} else {
			setMessage({
				title: "Validation failed",
				body:
					"Posts must include a title and text. The title must be no more than 50 characters and the text must be no more than 500 characters",
				href: "/post",
				linkName: "Try Again",
			});
			history.push("/error");
		}
	};

	return (
		<form id={styles.postForm}>
			<button
				id={styles.closeModalBtn}
				onClick={() => history.push("/dashboard")}
			>
				x
			</button>
			<h3 id={styles.heading}>Write Post</h3>
			<div id={styles.fieldContainer}>
				<div className={styles.formGroup}>
					<label className={styles.inputLabel}>Title:</label>
					<input
						placeholder={"50 characters or less"}
						className={styles.postInput}
						type="text"
					/>
				</div>
				<div className={styles.formGroup}>
					<label className={styles.inputLabel}>Post:</label>
					<textarea
						placeholder={"500 characters or less"}
						className={styles.postInput}
						type="text"
					/>
				</div>
			</div>
			<button className={styles.btn} onClick={(e) => handlePostSubmit(e)}>
				Create Post
			</button>
		</form>
	);
};

export default PostForm;
