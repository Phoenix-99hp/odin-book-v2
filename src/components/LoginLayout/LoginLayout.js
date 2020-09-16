import React, { useState, useEffect, useLayoutEffect } from "react";
import LoginHeader from "../LoginHeader/LoginHeader.js";
import styles from "./LoginLayout.module.css";
import TransitionPage from "../../pages/TransitionPage.js";
import { getTransitionState, setTransitionStorage } from "../../services/auth";
import { useSelector, useDispatch } from "react-redux";
import {
	selectTransitioning,
	setTransitioning,
} from "../../redux/slices/transitionSlice";
import { selectShouldTransition } from "../../redux/slices/shouldTransitionSlice";

const LoginLayout = ({ children }) => {
	const dispatch = useDispatch();
	const transitioning = useSelector(selectTransitioning);
	const shouldTransition = useSelector(selectShouldTransition);
	const [showTransitionPage, setShowTransitionPage] = useState(true);
	const [opacity, setOpacity] = useState(false);

	useEffect(() => {
		dispatch(setTransitioning(true));
	}, []);

	useEffect(() => {
		setTimeout(() => {
			dispatch(setTransitioning(false));
			setShowTransitionPage(true);
		}, 2000);
	}, [shouldTransition]);

	useEffect(() => {
		setTimeout(() => {
			setOpacity(true);
		}, 2000);
	}, [showTransitionPage]);

	return transitioning ? (
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

	// const [opacity, setOpacity] = useState(false);
	// const [showTransitionPage, setShowTransitionPage] = useState(true);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setShowTransitionPage(false);
	// 	}, 1000);
	// }, []);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setOpacity(true);
	// 	}, 1000);
	// }, [showTransitionPage]);

	// return showTransitionPage ? (
	// 	<TransitionPage />
	// ) : (
	// 	<div
	// 		className={styles.pageContainer}
	// 		id={opacity ? styles.changeOpacity : null}
	// 	>
	// 		<LoginHeader />
	// 		<main>{children}</main>
	// 		<footer>© {new Date().getFullYear()}</footer>
	// 	</div>
	// );
};

export default LoginLayout;
