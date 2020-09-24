import React, { useState, useRef } from "react";
import Link from "../Link/Link.js";
import DropdownData from "./DropdownData.js";
import styles from "./Dropdown.module.css";
import { useSelector } from "react-redux";
import { selectUser, setFriendRequests } from "../../redux/slices/userSlice";
import { useHistory } from "react-router-dom";

const Dropdown = () => {
	const user = useSelector(selectUser);
	const [isInitiated, setIsInitiated] = useState(false);
	const history = useHistory();

	return (
		<div
			id={styles.dropdownContainer}
			onMouseLeave={() => {
				setIsInitiated(false);
			}}
		>
			<div
				onClick={() => setIsInitiated(!isInitiated)}
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
					if (index === 3) {
						return (
							<div
								onClick={() => history.push(item.href)}
								className={styles.dropdownItem}
								key={index}
							>
								<Link
									name={item.name}
									click={item.click}
									href={item.href}
									value={user.friendRequests.length}
								></Link>
							</div>
						);
					} else {
						return (
							<div
								onClick={() => history.push(item.href)}
								className={styles.dropdownItem}
								key={index}
							>
								<Link
									name={item.name}
									click={item.click}
									href={item.href}
								></Link>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Dropdown;
