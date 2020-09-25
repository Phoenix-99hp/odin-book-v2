import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import { handleLogin } from "../../services/auth";
import { useHistory, Link } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext";

// const { setProfile } = useContext(ProfileContext);
const Login = () => {
	const { setMessage } = useContext(ErrorContext);
	const history = useHistory();
	// const user = useSelector(selectUser);
	// const dispatch = useDispatch();

	const [userLogin, setUserLogin] = useState({
		username: null,
		password: null,
	});

	const onChange = (e) => {
		const userInfo = { ...userLogin };
		const targetName = e.target.name;
		userInfo[targetName] = e.target.value;
		setUserLogin(userInfo);
	};

	const validate = ({ username, password }) => {
		if (username && password) {
			const trimmedUsername = username.trim();
			if (!trimmedUsername || !password) {
				return false;
			} else if (trimmedUsername.length > 30 || password.length > 30) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	};

	// const handleSetProfile = (username) => {
	// 	dispatch(fetchDataGET("/profile/", username));
	// dispatch(selectProfile);
	// fetch(`http://localhost:3001/api/profile/${username}`, {
	// 	method: "GET",
	// 	mode: "cors",
	// })
	// 	.then((res) => {
	// 		return res.json();
	// 	})
	// 	.then((response) => {
	// 		if (response) {
	// 			setProfile(response);
	// 		} else {
	// 			// navigate("/error");
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log("catch profile", error);
	// 		// navigate("/error");
	// 	});
	// };

	const loginReq = (e) => {
		e.preventDefault();
		if (validate(userLogin)) {
			fetch("https://salty-mesa-94052.herokuapp.com/api/login", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userLogin),
			})
				.then((res) => {
					return res.json();
				})
				.then((response) => {
					console.log("login", response);
					if (response) {
						handleLogin(response);
					}
				})
				.catch((error) => {
					console.log(error);
					history.push("/error");
				});
		} else {
			setMessage({
				title: "Validation failed",
				body:
					"The username and password fields must be filled out and no more than 30 characters.",
				href: "/odin-book-v2",
				linkName: "Try Again",
			});
			history.push("/error");
		}
	};

	return (
		<>
			<div id={styles.formContainer}>
				<form id={styles.loginForm}>
					<h3 id={styles.heading}>Sign In</h3>
					<div id={styles.innerFormContainer}>
						<div className={styles.formGroup}>
							<label className={styles.loginLabel}>Username:</label>
							<input
								name="username"
								onChange={onChange}
								type="text"
								className={styles.loginInput}
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.loginLabel}>Password:</label>
							<input
								name="password"
								onChange={onChange}
								type="password"
								className={styles.loginInput}
							/>
						</div>
					</div>
					<button type="submit" id={styles.loginBtn} onClick={loginReq}>
						Log In
					</button>
				</form>
			</div>
			<span id={styles.noAccountSpan}>
				Don't have an account?{" "}
				<Link id={styles.signUp} to="/odin-book-v2/signup">
					Sign Up
				</Link>
			</span>
		</>
	);
};

export default Login;
