import React from "react";
import "./index.css";
import App from "./App";
import * as Sentry from "@sentry/react";
import reportWebVitals from "./reportWebVitals";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";

Sentry.init({
	dsn:
		"https://5cf75211668f4970b824e3da1d6a60c4@o4504915258114049.ingest.sentry.io/4504915261325313",
	integrations: [new Sentry.BrowserTracing()],
	tracesSampleRate: 1.0,
});

render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
