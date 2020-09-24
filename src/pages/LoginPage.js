import React from "react";
import Login from "../components/Login/Login.js";
import LoginLayout from "../components/LoginLayout/LoginLayout.js";
import { getUser } from "../services/auth";
import IrrelevantPage from "./Error/IrrelevantPage.js";

const LoginPage = () => {
	return getUser() ? (
		<IrrelevantPage
			href={"/dashboard"}
			title={"You are already signed in"}
			linkName={"Here's a link to your feed"}
		/>
	) : (
		<LoginLayout>
			<Login />
		</LoginLayout>
	);
};

export default LoginPage;
