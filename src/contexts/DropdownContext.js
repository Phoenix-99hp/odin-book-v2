import React, { useState } from "react";
import { getMenu } from "../services/auth";

export const DropdownContext = React.createContext();

export const DropdownContextProvider = ({ children }) => {
	const [selectDropdown, setSelectDropdown] = useState(getMenu());

	return (
		<DropdownContext.Provider
			value={{
				selectDropdown: selectDropdown,
				setSelectDropdown: (selection) => setSelectDropdown(selection),
			}}
		>
			{children}
		</DropdownContext.Provider>
	);
};
