import React from "react";

const Link = ({ href, name, click, id }) => {
	return (
		<a id={id} onClick={click} href={href}>
			{name}
		</a>
	);
};

export default Link;
