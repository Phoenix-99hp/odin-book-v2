import React, { useRef, useState, useEffect } from "react";
import styles from "./Header.module.css";
import ActionBar from "../ActionBar/ActionBar.js";
import { useMediaQuery } from "react-responsive";
import Dropdown from "../Dropdown/Dropdown.js";

const Header = () => {
	const useDropdown = useMediaQuery({ query: "(max-width: 1000px)" });
	const useSmallHeading = useMediaQuery({ query: "(max-width: 380px)" });
	return useDropdown ? (
		<div id={styles.headerContainerSmall}>
			<div id={styles.contentContainerSmall}>
				<div className={styles.placeholder}></div>
				<h1 id={styles.headingSmall}>{useSmallHeading ? "OB" : "Odin-Book"}</h1>
				<div className={styles.placeholder}>
					<Dropdown />
				</div>
			</div>
		</div>
	) : (
		<div id={styles.headerContainer}>
			<div id={styles.contentContainer}>
				<h1 id={styles.heading}>Odin-Book</h1>
			</div>
			<ActionBar />
		</div>
	);
};

// <div
// 	id={useDropdown ? styles.headerContainerSmall : styles.headerContainer}
// >
// 	<div id={styles.contentContainer}>
// 		<div className={styles.placeholder}></div>
// 		<h1 id={useDropdown ? styles.headingSmall : styles.heading}>
// 			Odin-Book
// 		</h1>
// 		<div className={styles.placeholder}>
// 			{useDropdown ? <Dropdown /> : <ActionBar />}
// 		</div>
// 	</div>
// </div>

export default Header;
