import React, { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import styles from "./RegularLayout.module.css";

const RegularLayout = ({ children }) => {
	return (
		<div id={styles.fadeContainer}>
			<div
				className={styles.pageContainer}
				// id={opacity ? styles.changeOpacity : null}
			>
				<Header />
				<main>{children}</main>
				<footer>© {new Date().getFullYear()}</footer>
			</div>
		</div>
	);
};

export default RegularLayout;
