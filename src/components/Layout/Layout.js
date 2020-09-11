import React, { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import styles from "./Layout.module.css";
import TransitionPage from "../../pages/TransitionPage.js";
// import { isLoggedIn } from "../../services/auth";
// import Login from "../../sections/Login";
// import SEO from "../SEO";
// import Spinner from "../Spinner";

const Layout = ({ children }) => {
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
			<Header />
			<main>{children}</main>
			<footer>© {new Date().getFullYear()}</footer>
		</div>
	) : (
		<TransitionPage />
	);
};

export default Layout;
