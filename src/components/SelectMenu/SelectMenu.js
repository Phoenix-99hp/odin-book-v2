import React, { useContext } from "react";
import { DropdownContext } from "../../contexts/DropdownContext";
import styles from "./SelectMenu.module.css";
import { setMenu } from "../../services/auth.js";

const SelectMenu = () => {
	const { selectDropdown, setSelectDropdown } = useContext(DropdownContext);
	return (
		<button
			id={styles.selectMenuBtn}
			onClick={() => {
				setMenu(!selectDropdown);
				setSelectDropdown(!selectDropdown);
			}}
		>
			{selectDropdown ? "Use Action Bar" : "Use Dropdown"}
		</button>
	);
};

export default SelectMenu;
