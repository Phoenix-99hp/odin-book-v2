import React, { useState, useEffect } from "react";
import { setShouldTransitionStorage } from "../../services/auth.js";
import { useMediaQuery } from "react-responsive";
// import { selectShouldTransition } from "../../redux/slices/shouldTransitionSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../Spinner/Spinner.js";
import styles from "./Transition.module.css";
import LoadBar from "../LoadBar/LoadBar.js";
import odinProjectIMG from "../../images/odin.jpg";
import facebookIMG from "../../images/facebook2.png";

const Transition = () => {
	// const dispatch = useDispatch();
	// const shouldTransition = useSelector(selectShouldTransition);
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

export default Transition;
