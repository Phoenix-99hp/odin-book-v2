import React, { useContext } from "react";
import styles from "./Error.module.css";
import LoginLayout from "../../components/LoginLayout/LoginLayout.js";
import { ErrorContext } from "../../contexts/ErrorContext";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	const { message } = useContext(ErrorContext);
	return (
		<LoginLayout>
			<div id={styles.errorContainer}>
				<h1 id={styles.errorTitle}>{message.title}</h1>
				<p id={styles.errorBody}>{message.body}</p>
				<Link id={styles.link} to={message.href}>
					{message.linkName}
				</Link>
			</div>
		</LoginLayout>
	);
};

export default ErrorPage;
