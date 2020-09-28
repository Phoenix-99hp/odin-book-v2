import React, { useContext } from "react";
import { handleLogin } from "../../services/auth";
import styles from "./SignUp.module.css";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext";
import { setProfile } from "../../redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const SignUp = () => {
	const { setMessage } = useContext(ErrorContext);
	const history = useHistory();
	const dispatch = useDispatch();

	const handleFormSubmit = (e) => {
		const url = "https://salty-mesa-94052.herokuapp.com/api/signup";
		const request = new XMLHttpRequest();

		request.open("POST", url, true);

		request.onload = function () {
			if (request.readyState === request.DONE) {
				if (request.status === 200) {
					console.log(request.response, "REQ RES");
					console.log(JSON.parse(request.response), "JSON");
					if (JSON.parse(request.response)) {
						handleLogin(JSON.parse(request.response));
						dispatch(setUser(request.response));
						dispatch(setProfile(request.response));
						history.push("/dashboard");
					} else {
						setMessage({
							title: "Something went wrong",
							body:
								"Make sure you entered a username and password - each 30 characters or less. If you did, the username you entered is probably already taken",
							href: "/signup",
							linkName: "Try Again",
						});
						history.push("/error");
					}
				}
			}
		};

		request.onerror = function () {
			setMessage({
				title: "Something went wrong",
				body: "It's not immediately clear what happened",
				href: "/signup",
				linkName: "Try Again",
			});
			history.push("/error");
		};

		const formData = new FormData(e.target);
		request.send(formData);
		e.preventDefault();
	};

	return (
		<div id={styles.formContainer}>
			<form onSubmit={(e) => handleFormSubmit(e)} id={styles.loginForm}>
				<h3 id={styles.heading}>Sign Up</h3>
				<div id={styles.innerFormContainer}>
					<div className={styles.formGroup}>
						<label className={styles.loginLabel}>Username:</label>
						<input name="username" type="text" className={styles.loginInput} />
					</div>
					<div className={styles.formGroup}>
						<label className={styles.loginLabel}>Password:</label>
						<input
							name="password"
							type="password"
							className={styles.loginInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.loginLabel}>Confirm Password:</label>
						<input
							name="confirmPassword"
							type="password"
							className={styles.loginInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.loginLabel}>Avatar (60 x 60):</label>
						<input
							className={styles.imageInput}
							name="avatar"
							type="file"
							value={null}
							accept={("image/png", "image/jpeg")}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.loginLabel}>
							Profile Picture (120 x 120):
						</label>
						<input
							className={styles.imageInput}
							name="profilePicture"
							type="file"
							value={null}
							accept={("image/png", "image/jpeg")}
						/>
					</div>
				</div>
				<button type="submit" id={styles.loginBtn}>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUp;
