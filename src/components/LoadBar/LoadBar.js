import React from "react";
import styles from "./LoadBar.module.css";

const LoadBar = () => {
	return (
		<div id={styles.outer}>
			<div id={styles.loadBar} />
		</div>
	);
};

export default LoadBar;
