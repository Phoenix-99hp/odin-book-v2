import React from "react";
import { handleLogin } from "../../services/auth";
import styles from "./SignUp.module.css";
import { useHistory } from "react-router-dom";
// import Spinner from "../../components/Spinner";

const SignUp = () => {
	// const [userLogin, setUserLogin] = useState({
	// 	username: null,
	// 	password: null,
	// 	confirmPassword: null,
	// });
	const history = useHistory();

	const handleFormSubmit = (e) => {
		const url = "http://localhost:3001/api/signup";
		const request = new XMLHttpRequest();
		request.open("POST", url, true);

		request.onload = function () {
			if (request.readyState === request.DONE) {
				if (request.status === 200) {
					handleLogin(JSON.parse(request.response));
				}
			}
		};

		request.onerror = function () {
			history.push("/error");
		};

		request.send(new FormData(e.target)); // create FormData from form that triggered event
		e.preventDefault();
	};

	// and you can attach form submit event like this for example
	// function attachFormSubmitEvent(formId){
	//   document.getElementById(formId).addEventListener("submit", formSubmit);
	// }

	// const [file, setFile] = useState([]);

	// const onChange = (e) => {
	// 	const userInfo = { ...userLogin };
	// 	const targetName = e.target.name;
	// 	userInfo[targetName] = e.target.value;
	// 	setUserLogin(userInfo);
	// };

	// const onFileChange = (e) => {
	// 	setFile(e.target.files[0]);
	// };

	// const validate = ({ username, password, confirmPassword }) => {
	// 	if (!username || !password || password !== confirmPassword) {
	// 		return false;
	// 	}
	// 	return true;
	// };

	// const signUpReq = (e) => {
	// 	e.preventDefault();
	// 	console.log(userLogin);
	// 	console.log(file);
	// 	console.log([JSON.stringify(userLogin), file]);
	// 	if (validate(userLogin)) {
	// 		fetch("http://localhost:3001/api/signup", {
	// 			method: "POST",
	// 			mode: "cors",
	// 			headers: {
	// 				"Content-Type": "multipart/form-data",
	// 			},
	// 			body: [JSON.stringify(userLogin), file],
	// 		})
	// 			.then((res) => {
	// 				return res.json();
	// 			})
	// 			.then((response) => {
	// 				if (response) {
	// 					handleLogin(response);
	// 				} else {
	// 					navigate("/error");
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 				navigate("/error");
	// 			});
	// 	} else {
	// 		console.log("not validated");
	// 		navigate("/error");
	// 	}
	// };

	return (
		// spinner ?
		//     <Spinner />
		//     :
		<>
			<div id={styles.formContainer}>
				<form onSubmit={(e) => handleFormSubmit(e)} id={styles.loginForm}>
					<h3 id={styles.heading}>Sign Up</h3>
					<div id={styles.innerFormContainer}>
						<div className={styles.formGroup}>
							<label className={styles.loginLabel}>Username:</label>
							<input
								name="username"
								type="text"
								className={styles.loginInput}
							/>
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
							<label className={styles.loginLabel}>Avatar:</label>
							<input
								id={styles.imageInput}
								name="avatar"
								type="file"
								accept="image/png, image/jpeg"
							/>
						</div>
					</div>
					<button type="submit" id={styles.loginBtn}>
						Sign Up
					</button>
				</form>
			</div>
		</>
	);
};

export default SignUp;
