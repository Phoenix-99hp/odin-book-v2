import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./Header.module.css";
import ActionBar from "../ActionBar/ActionBar.js";
import { useMediaQuery } from "react-responsive";
import Dropdown from "../Dropdown/Dropdown.js";
import { DropdownContext } from "../../contexts/DropdownContext";
import SelectMenu from "../SelectMenu/SelectMenu.js";

const Header = () => {
	const { selectDropdown, setSelectDropdown } = useContext(DropdownContext);
	const useDropdown = useMediaQuery({ query: "(max-width: 1000px)" });
	const useSmallHeading = useMediaQuery({ query: "(max-width: 380px)" });

	return useDropdown || selectDropdown ? (
		<div id={styles.headerContainerSmall}>
			<div id={styles.contentContainerSmall}>
				<div className={styles.placeholder}>
					{!useDropdown ? <SelectMenu /> : ""}
				</div>
				<h1 id={styles.headingSmall}>
					{useSmallHeading ? "O-B" : "Odin-Book"}
				</h1>
				<div className={styles.placeholder}>
					<Dropdown />
				</div>
			</div>
		</div>
	) : (
		<div id={styles.headerContainer}>
			<div id={styles.contentContainer}>
				<div className={styles.placeholder}>
					<SelectMenu />
				</div>

				<h1 id={styles.heading}>Odin-Book</h1>

				<div className={styles.placeholder}></div>
			</div>
			<ActionBar />
		</div>
	);
};

export default Header;
