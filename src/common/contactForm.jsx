import React, { Component } from "react";
import "../css/contactForm.css";
import DisplayError from "./displayError";
import Joi from "joi-browser";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

class ContactForm extends Component {
	state = {
		values: { name: "", email: "", message: "" },
		errors: { name: "", email: "", message: "" },
		formValid: false,
	};

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	schema = {
		name: Joi.string()
			.required()
			.label("Name"),
		email: Joi.string()
			.email()
			.required()
			.label("Email"),
		message: Joi.string()
			.min(5)
			.required()
			.label("Message"),
	};

	validateField = (fieldName) => {
		const fieldValue = this.state.values[fieldName];
		const fieldInSchema = this.schema[fieldName];
		const result = Joi.validate(fieldValue, fieldInSchema);
		const errors = { ...this.state.errors };
		if (result.error) {
			errors[fieldName] = result.error.message;
		} else {
			errors[fieldName] = "";
		}
		this.setState({ errors });
	};

	validateForm = () => {
		const result = Joi.validate(this.state.values, this.schema);
		let formValid = false;
		if (!result.error) {
			formValid = true;
		}
		return formValid;
	};

	handleChange = (e) => {
		const fieldName = e.target.name;
		const values = { ...this.state.values };
		values[fieldName] = e.target.value;
		this.setState({ values }, () => this.validateField(fieldName));
	};

	sendEmail = (e) => {
		console.log(e.target);
		emailjs
			.sendForm("gmail", "template_jnyv3pw", e.target, "4dQHllra-SUsL2Qmc")
			.then(
				(result) => {
					console.log(result.text);
					toast.success("Your email was sent!");
				},
				(error) => {
					console.log(error.text);
					toast.error("Something went wrong...");
				}
			);
	};

	resetForm = () => {
		const values = { ...this.state.values };
		values.name = "";
		values.email = "";
		values.message = "";
		this.setState({ values });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const formValid = this.validateForm();
		if (!formValid) {
			return;
		}
		this.sendEmail(e);
		this.resetForm();
	};

	render() {
		const { name, email, message } = this.state.values;
		const {
			name: nameError,
			email: emailError,
			message: messageError,
		} = this.state.errors;
		return (
			<div className="container">
				<div className="content">
					<div className="left-side">
						<div className="address details">
							<i className="fas fa-map-marker-alt"></i>
							<div className="topic">Address</div>
							<div className="text-one">Pitu Guli 23</div>
							<div className="text-two">6000 Ohrid</div>
							<div className="text-two">North Macedonia</div>
						</div>
						<div className="phone details">
							<i className="fas fa-phone-alt"></i>
							<div className="topic">Phone</div>
							<div className="text-one">+389 71 216 556</div>
						</div>
						<div className="email details">
							<i className="fas fa-envelope"></i>
							<div className="topic">Email</div>
							<div className="text-one">kovacheskaelena@gmail.com</div>
						</div>
					</div>
					<div className="right-side">
						<div className="topic-text">Send me an email</div>
						<p>
							If you like my work and want to work with me or if you have any
							questions related to my work, feel free to send me message. It's
							my pleasure to help you.
						</p>
						<form action="#" onSubmit={(e) => this.handleSubmit(e)}>
							<div className="input-box">
								<input
									type="text"
									name="name"
									onChange={(e) => this.handleChange(e)}
									value={name}
									placeholder="Enter your name"
								/>
							</div>
							<DisplayError errorMessage={nameError} />
							<div className="input-box">
								<input
									type="text"
									name="email"
									onChange={(e) => this.handleChange(e)}
									value={email}
									placeholder="Enter your email"
								/>
							</div>
							<DisplayError errorMessage={emailError} />
							<div className="input-box message-box">
								<textarea
									id="freeform"
									name="message"
									rows="4"
									cols="50"
									onChange={(e) => this.handleChange(e)}
									value={message}
									placeholder="Enter your message"
								></textarea>
							</div>
							<DisplayError errorMessage={messageError} />
							<input
								className="btn btn-primary"
								disabled={!this.validateForm()}
								type="submit"
								value="Submit"
							></input>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ContactForm;
