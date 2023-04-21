import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const steps = [
	{
		id: "0",
		message: "Hello!",

		// This calls the next id
		// i.e. id 1 in this case
		trigger: "1",
	},
	{
		id: "1",

		// This message appears in
		// the bot chat bubble
		message: "Please write your name",
		trigger: "2",
	},
	{
		id: "2",

		// Here we want the user
		// to enter input
		user: true,
		trigger: "3",
	},
	{
		id: "3",
		message: " Hi {previousValue}, how can I help you?",
		trigger: "4",
	},
	{
		id: "4",
		options: [
			// When we need to show a number of
			// options to choose we create alist
			// like this
			{ value: 1, label: "About Vidly", trigger: "5" },
			{ value: 2, label: "About Me", trigger: "6" },
			{ value: 3, label: "Contact Me", trigger: "7" },
			{ value: 4, label: "Play a Game", trigger: "8" },
		],
	},
	{
		id: "5",
		message:
			"Introducing Vidly - the movie rental service that offers a seamless and enjoyable user experience! With its stunning front-end development, Vidly showcases a range of innovative features, including authentication, authorization, routing, form validation, pagination, filtering, sorting, chatbot functionality, and many more.",
		trigger: "4",
	},
	{
		id: "6",
		message:
			"Introducing Elena - a talented and dedicated front-end web developer who is skilled in React, JavaScript, HTML, and CSS. With a passion for creating user-friendly and engaging interfaces, Elena has been developing feature-rich applications with routing and navigation, authorization and authentication, form validation, pagination, filtering, sorting, chatbot functionalities, and many more features. In summary, if you're looking for a front-end developer with an eye for design who is passionate about creating engaging and user-friendly interfaces, Elena is the right fit for your project. With her skills in React, JavaScript, HTML, and CSS, Elena has the expertise to deliver feature-rich applications that meet your needs and exceed your expectations.",
		trigger: "4",
	},
	{
		id: "7",
		message:
			"You can contact Elena on +389 71 216 556 or send her an email to kovacheskaelena@gmail.com",
		trigger: "4",
	},
	{
		id: "8",
		message: "What number I am thinking?",
		trigger: "9",
	},
	{
		id: "9",
		options: [
			{ value: 1, label: "Number 1", trigger: "11" },
			{ value: 2, label: "Number 2", trigger: "10" },
			{ value: 3, label: "Number 3", trigger: "10" },
		],
	},
	{
		id: "10",
		message: "Wrong answer, try again.",
		trigger: "9",
	},
	{
		id: "11",
		message: "Awesome! You are a telepath!",
		trigger: "4",
	},
];

// Creating our own theme
const theme = {
	background: "#F8F9FA",
	headerBgColor: "#FF0000", //"#197B22",
	headerFontSize: "20px",
	botBubbleColor: "#0F3789",
	headerFontColor: "white",
	botFontColor: "white",
	userBubbleColor: "#FF5733",
	userFontColor: "white",
};

// Set some properties of the bot
const config = {
	floating: true,
};

function Chatbot() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ChatBot
					// This appears as the header
					// text for the chat bot
					headerTitle="ChatBot"
					steps={steps}
					{...config}
				/>
			</ThemeProvider>
		</div>
	);
}

export default Chatbot;
