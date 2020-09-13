import React, { useState, useEffect, useLayoutEffect } from "react";
import LoginHeader from "../LoginHeader/LoginHeader.js";
import styles from "./LoginLayout.module.css";
import TransitionPage from "../../pages/TransitionPage.js";

const LoginLayout = ({ children }) => {
	const [opacity, setOpacity] = useState(false);
	const [showTransitionPage, setShowTransitionPage] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setShowTransitionPage(false);
		}, 1000);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setOpacity(true);
		}, 1000);
	}, [showTransitionPage]);

	return showTransitionPage ? (
		<TransitionPage />
	) : (
		<div
			className={styles.pageContainer}
			id={opacity ? styles.changeOpacity : null}
		>
			<LoginHeader />
			<main>{children}</main>
			<footer>© {new Date().getFullYear()}</footer>
		</div>
	);
};

export default LoginLayout;
