import React, { Component } from "react";
import DisplayError from "../common/displayError";
import FormGroup from "../common/formGroup";
import axios from "axios";
import config from "../utils/config.json";
import { getFromLocalDb, saveToLocalDb } from "./../services/localdbService";
import { toast } from "react-toastify";

const { baseUrl, port, authUrl } = config;

class Login extends Component {
	state = {
		username: "",
		password: "",
		errors: { username: "", password: "" },
		usernameValid: false,
		passwordValid: false,
		formValid: false,
	};

	componentDidMount() {
		const token = getFromLocalDb("token").length;
		console.log(token);
		!token &&
			toast("Please log in", {
				toastId: "login",
			});
	}

	validateForm = () => {
		const { usernameValid, passwordValid } = this.state;
		if (usernameValid && passwordValid) {
			this.setState({ formValid: true });
		} else {
			this.setState({ formValid: false });
		}
	};

	validateField = (fieldName, value, minLength) => {
		const fieldValid = `${fieldName}Valid`;
		let fieldValidValue = false;
		const errors = { ...this.state.errors };
		if (value.trim().length >= minLength) {
			errors[fieldName] = "";
			fieldValidValue = true;
		} else {
			errors[
				fieldName
			] = `${fieldName} must be at least ${minLength} characters`;
		}
		this.setState({ [fieldValid]: fieldValidValue, errors }, this.validateForm);
	};

	sendLoginToDb = async () => {
		const { username, password } = this.state;
		try {
			const { data: jwt } = await axios.post(`${baseUrl}:${port}${authUrl}`, {
				email: username,
				password,
			});
			saveToLocalDb("token", jwt);
			window.location = "/movies";
		} catch (ex) {
			const errors = { ...this.state.errors };
			if (ex.response && ex.response.status === 400) {
				errors.username = ex.response.data;
			} else {
				errors.username = "Something went wrong";
			}
			this.setState({ errors });
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.sendLoginToDb();
	};

	handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => this.validateField(name, value, 5));
	};

	render() {
		const { username, password, errors, formValid } = this.state;
		return (
			<form onSubmit={this.handleSubmit} className="MainContainer">
				<FormGroup
					fieldLabel="Username"
					fieldName="username"
					fieldValue={username}
					onChange={this.handleChange}
					type="text"
					placeholder="Enter username"
				/>
				<DisplayError errorMessage={errors.username} />
				<FormGroup
					fieldLabel="Password"
					fieldName="password"
					fieldValue={password}
					onChange={this.handleChange}
					type="password"
					placeholder="Enter password"
				/>
				<DisplayError errorMessage={errors.password} />
				<button type="submit" className="btn btn-primary" disabled={!formValid}>
					Login
				</button>
			</form>
		);
	}
}

export default Login;
