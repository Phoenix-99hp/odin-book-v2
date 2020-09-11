import React, { useState, useEffect } from "react";
import LoginHeader from "../LoginHeader/LoginHeader.js";
import styles from "./LoginLayout.module.css";
import TransitionPage from "../../pages/TransitionPage.js";

const LoginLayout = ({ children }) => {
	const [isReady, setIsReady] = useState(false);
	const [opacity, setOpacity] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsReady(true);
		}, 1000);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setOpacity(true);
		}, 1000);
	}, [isReady]);

	return isReady ? (
		<div
			className={styles.pageContainer}
			id={opacity ? styles.changeOpacity : null}
		>
			<LoginHeader />
			<main>{children}</main>
			<footer>© {new Date().getFullYear()}</footer>
		</div>
	) : (
		<TransitionPage />
	);
};

export default LoginLayout;
