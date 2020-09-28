import React, { useState, useEffect, useLayoutEffect } from "react";
import LoginHeader from "../LoginHeader/LoginHeader.js";
import styles from "./LoginLayout.module.css";
import TransitionPage from "../../pages/TransitionPage.js";
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
		}, 3000);
	}, [shouldTransition]);

	useEffect(() => {
		setTimeout(() => {
			setOpacity(true);
		}, 3000);
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
};

export default LoginLayout;
