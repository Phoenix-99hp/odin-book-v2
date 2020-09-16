import React from "react";
import styles from "./LoadBar.module.css";

const LoadBar = () => {
	return (
		<div id={styles.outer}>
			{/* <div id={styles.inner}> */}
			<div id={styles.loadBar} />
			{/* </div> */}
		</div>
	);
};

export default LoadBar;
