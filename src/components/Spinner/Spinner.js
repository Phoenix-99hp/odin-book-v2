import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => {
	return (
		<div id={styles.outer}>
			<div id={styles.inner}>
				<div id={styles.spinner} />
				<div id={styles.center} />
			</div>
		</div>
	);
};

export default Spinner;
