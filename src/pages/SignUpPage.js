import React from "react";
import LoginLayout from "../components/LoginLayout/LoginLayout.js";
import SignUp from "../components/SignUp/SignUp.js";

const SignUpPage = () => {
	return (
		<LoginLayout>
			<SignUp />
		</LoginLayout>
	);
};

export default SignUpPage;
