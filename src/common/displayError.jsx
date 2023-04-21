import React from "react";

const DisplayError = ({ errorMessage }) => {
	return (
		<div
			className="alert alert-danger"
			role="alert"
			hidden={errorMessage === "" ? true : false}
		>
			{errorMessage}
		</div>
	);
};

export default DisplayError;
