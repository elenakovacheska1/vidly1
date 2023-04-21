import React from "react";

const FormGroup = ({
	fieldLabel,
	fieldName,
	fieldValue,
	onChange,
	type,
	placeholder,
}) => {
	return (
		<div className="form-group">
			<label htmlFor={fieldName}>{fieldLabel}</label>
			<input
				value={fieldValue}
				name={fieldName}
				onChange={(e) => onChange(e)}
				type={type}
				className="form-control"
				id={fieldName}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default FormGroup;
