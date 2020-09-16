import React from "react";
import styles from "./LoginHeader.module.css";
import { useMediaQuery } from "react-responsive";

const LoginHeader = () => {
	const useSmallHeading = useMediaQuery({ query: "(max-width: 380px)" });
	return (
		<div id={styles.headerContainer}>
			<div id={styles.contentContainer}>
				<h1 id={styles.heading}>{useSmallHeading ? "O-B" : "Odin-Book"}</h1>
			</div>
		</div>
	);
};

export default LoginHeader;
