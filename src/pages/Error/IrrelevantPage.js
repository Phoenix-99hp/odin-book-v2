import React from "react";
import styles from "./Error.module.css";
import LoginLayout from "../../components/LoginLayout/LoginLayout.js";
import { Link } from "react-router-dom";

const IrrelevantPage = ({ title, href, linkName }) => {
	return (
		<LoginLayout>
			<div id={styles.errorContainer}>
				<h1 id={styles.errorTitle}>{title}</h1>
				<Link id={styles.link} to={href}>
					{linkName}
				</Link>
			</div>
		</LoginLayout>
	);
};

export default IrrelevantPage;
