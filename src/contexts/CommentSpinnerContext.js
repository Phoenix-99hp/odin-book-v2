import React, { useState } from "react";

export const CommentSpinnerContext = React.createContext();

export const CommentSpinnerContextProvider = ({ children }) => {
	const [commentSpinner, setCommentSpinner] = useState(false);

	return (
		<CommentSpinnerContext.Provider
			value={{
				commentSpinner: commentSpinner,
				setCommentSpinner: (activity) => setCommentSpinner(activity),
			}}
		>
			{children}
		</CommentSpinnerContext.Provider>
	);
};
