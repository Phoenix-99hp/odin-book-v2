import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostContextProvider = ({ children }) => {
	const [postId, setPost] = useState([]);

	return (
		<PostContext.Provider
			value={{ postId: postId, setPost: (newPostId) => setPost(newPostId) }}
		>
			{children}
		</PostContext.Provider>
	);
};
