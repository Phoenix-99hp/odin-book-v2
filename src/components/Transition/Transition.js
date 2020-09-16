import React, { useState, useEffect } from "react";
import {
	setTransitionStorage,
	setShouldTransitionStorage,
} from "../../services/auth.js";
import { setTransitioning } from "../../redux/slices/transitionSlice";
import {
	setShouldTransition,
	selectShouldTransition,
} from "../../redux/slices/shouldTransitionSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner.js";
import styles from "./Transition.module.css";
import LoadBar from "../LoadBar/LoadBar.js";
import odinProjectIMG from "../../images/odin.jpg";
import facebookIMG from "../../images/facebook2.png";

const Transition = () => {
	const dispatch = useDispatch();
	const shouldTransition = useSelector(selectShouldTransition);
	const [opacity, setOpacity] = useState(false);

	useEffect(() => {
		setOpacity(true);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setShouldTransitionStorage(true);
			// dispatch(setShouldTransition(true));
		}, 2000);
	}, [opacity]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setTransitionStorage(true);
	// 		dispatch(setTransitioning(true));
	// 	}, 2000);
	// }, [shouldTransition]);

	return (
		<div
			className={styles.pageContainer}
			id={opacity ? styles.changeOpacity : null}
		>
			<header id={styles.headerPlaceholder} />
			<main>
				<div id={styles.contentArea}>
					<div id={styles.transitionContainer}>
						<div id={styles.logo}>
							<img className={styles.odinImage} src={odinProjectIMG} />
							<span id={styles.plus}>{"-"}</span>
							<img className={styles.facebookImage} src={facebookIMG} />
						</div>
						<LoadBar />
					</div>
				</div>
			</main>
			<footer>© {new Date().getFullYear()}</footer>
		</div>
	);
};

// // setTransitionStorage(true);
// const dispatch = useDispatch();
// const transitioning = useSelector(selectTransitioning);
// const [opacity, setOpacity] = useState(false);
// // const [showTransitionPage, setShowTransitionPage] = useState(true);

// useEffect(() => {
// 	setTimeout(() => {
// 		dispatch(setTransitioning(false));
// 		setTransitionStorage(false);
// 	}, 1000);
// }, []);

// // useEffect(() => {
// // 	setTimeout(() => {
// // 		setOpacity(true);
// // 	}, 1000);
// // }, [showTransitionPage]);

// useEffect(() => {
// 	setTimeout(() => {
// 		setOpacity(true);
// 	}, 1000);
// }, [transitioning]);

// return transitioning ? (
// 	<TransitionPage />
// ) : (

export default Transition;
