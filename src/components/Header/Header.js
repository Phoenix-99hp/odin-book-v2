import React from "react";
import styles from "./Header.module.css";
import ActionBar from "../ActionBar/ActionBar.js";
import { useMediaQuery } from "react-responsive";
import Dropdown from "../Dropdown/Dropdown.js";

const Header = () => {
	const useDropdown = useMediaQuery({ query: "(max-width: 740px)" });

	return (
		<div
			id={useDropdown ? styles.headerContainerSmall : styles.headerContainer}
		>
			<div id={styles.contentContainer}>
				<h1 id={useDropdown ? styles.headingSmall : styles.heading}>
					Odin-Book
				</h1>
			</div>
			{useDropdown ? <Dropdown /> : <ActionBar />}
		</div>
	);
};

export default Header;
