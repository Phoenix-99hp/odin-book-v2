import React from "react";
import styles from "./FriendRequests.module.css";
import { useHistory } from "react-router-dom";

const FriendRequests = ({ requests }) => {
	const history = useHistory();

	return requests[0] ? (
		<div id={styles.frContainer}>
			<div id={styles.frNumber}>{requests.length}</div>
			<button id={styles.viewFrs} onClick={() => history.push("/fr-view")}>
				Friend Requests
			</button>
		</div>
	) : null;
};

export default FriendRequests;
