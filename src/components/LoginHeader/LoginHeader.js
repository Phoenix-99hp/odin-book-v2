import React from "react";
import styles from "./LoginHeader.module.css";

const LoginHeader = () => {
	return (
		<div id={styles.headerContainer}>
			<div id={styles.contentContainer}>
				<h1 id={styles.heading}>Odin-Book</h1>
			</div>
		</div>
	);
};

export default LoginHeader;
