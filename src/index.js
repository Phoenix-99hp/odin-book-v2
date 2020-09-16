import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PostContextProvider } from "./contexts/PostContext.js";
import * as serviceWorker from "./serviceWorker";
import { DropdownContextProvider } from "./contexts/DropdownContext";
import { ErrorContextProvider } from "./contexts/ErrorContext";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorContextProvider>
				<DropdownContextProvider>
					<PostContextProvider>
						<App />
					</PostContextProvider>
				</DropdownContextProvider>
			</ErrorContextProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
