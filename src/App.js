import React from "react";
import DashboardPage from "./pages/DashboardPage.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import FrViewPage from "./pages/FrViewPage.js";
import FrSendPage from "./pages/FrSendPage.js";
import PostPage from "./pages/PostPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import UserListPage from "./pages/UserListPage.js";
import WriteCommentPage from "./pages/WriteCommentPage.js";
import ErrorPage from "./pages/Error/ErrorPage.js";

function App() {
	return (
		<Router basename="/odin-book-v2">
			<div className="App">
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<Route exact path="/dashboard" component={DashboardPage} />
					<Route exact path="/signup" component={SignUpPage} />
					<Route exact path="/fr-send" component={FrSendPage} />
					<Route exact path="/fr-view" component={FrViewPage} />
					<Route exact path="/post" component={PostPage} />
					<Route exact path="/profile" component={ProfilePage} />
					<Route exact path="/user-list" component={UserListPage} />
					<Route exact path="/comment" component={WriteCommentPage} />
					<Route exact path="/error" component={ErrorPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
