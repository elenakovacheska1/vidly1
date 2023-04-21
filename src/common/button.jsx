import React from "react";

const Button = ({ className, component }) => {
	return (
		<button className={className} type="button">
			{component}
		</button>
	);
};

export default Button;
