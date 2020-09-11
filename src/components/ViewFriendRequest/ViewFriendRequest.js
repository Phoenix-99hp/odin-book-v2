import React from "react";
import styles from "./ViewFriendRequest.module.css";
import GetFriendRequests from "../GetFriendRequests/GetFriendRequests.js";
import { useHistory } from "react-router-dom";

const ViewFriendRequest = () => {
	const history = useHistory();
	return (
		<div id={styles.friendReqForm}>
			<button
				id={styles.closeModalBtn}
				onClick={() => history.push("/dashboard")}
			>
				x
			</button>
			<h3 id={styles.heading}>Friend Requests</h3>
			<GetFriendRequests />
		</div>
	);
};

export default ViewFriendRequest;
