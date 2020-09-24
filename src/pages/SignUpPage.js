import React from "react";
import LoginLayout from "../components/LoginLayout/LoginLayout.js";
import SignUp from "../components/SignUp/SignUp.js";
import { getUser } from "../services/auth";
import IrrelevantPage from "./Error/IrrelevantPage.js";

const SignUpPage = () => {
	return getUser() ? (
		<IrrelevantPage
			href={"/dashboard"}
			title={
				"You are signed in. In order to register a new account you need to first sign out "
			}
			linkName={"Here's a link to your feed"}
		/>
	) : (
		<LoginLayout>
			<SignUp />
		</LoginLayout>
	);
};

export default SignUpPage;
