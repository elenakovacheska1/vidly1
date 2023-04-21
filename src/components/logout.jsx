import React, { Component } from "react";

class Logout extends Component {
	state = {};

	loggingOut = () => {
		window.localStorage.removeItem("token");
		window.location = "/movies";
	};

	render() {
		this.loggingOut();
		return <p>You are logged out.</p>;
	}
}

export default Logout;
