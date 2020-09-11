import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Link from "../Link/Link.js";
import DropdownData from "./DropdownData.js";
import styles from "./Dropdown.module.css";

const Dropdown = () => {
	const [isInitiated, setIsInitiated] = useState(false);

	return (
		<div
			id={styles.dropdownContainer}
			onMouseLeave={() => {
				setIsInitiated(false);
			}}
		>
			<div
				onMouseOver={() => {
					setIsInitiated(true);
				}}
				id={styles.dropdownIcon}
			>
				Dropdown
			</div>
			<div
				className={`${styles.itemsInner} ${
					isInitiated ? styles.itemsInnerReady : null
				}`}
			>
				{DropdownData.map((item, index) => {
					return (
						<div className={styles.dropdownItem} key={index}>
							<Link name={item.name} click={item.click} href={item.href}></Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Dropdown;
