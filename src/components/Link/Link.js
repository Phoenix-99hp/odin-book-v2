import React from "react";
import styles from "./Link.module.css";

const Link = ({ href, name, click, id, value }) => {
	return (
		<a id={id} onClick={click} href={href}>
			{value !== null && value !== undefined ? (
				<div id={styles.valueDiv}>
					{name}
					<span id={styles.valueSpan}>{value}</span>
				</div>
			) : (
				name
			)}
		</a>
	);
};

export default Link;
