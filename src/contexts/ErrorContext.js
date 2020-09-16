import React, { useState } from "react";

export const ErrorContext = React.createContext();

export const ErrorContextProvider = ({ children }) => {
	const [message, setMessage] = useState({
		title: "",
		body: "",
		href: "",
		linkName: "",
	});

	return (
		<ErrorContext.Provider
			value={{
				message: message,
				setMessage: (title, body, href, linkName) =>
					setMessage(title, body, href, linkName),
			}}
		>
			{children}
		</ErrorContext.Provider>
	);
};
