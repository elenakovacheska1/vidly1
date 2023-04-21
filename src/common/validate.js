import Joi from "joi-browser";

export const validateProperty = (name, value, schema) => {
	const obj = {
		[name]: value,
	};
	const fieldSchema = {
		[name]: schema[name],
	};
	return Joi.validate(obj, fieldSchema);
};

export const getErrorMessage = (name, value, schema) => {
	const result = validateProperty(name, value, schema);
	return result.error ? result.error.details[0].message : "";
};

export const validateForm = (data, schema) => {
	const options = {
		abortEarly: false,
	};
	const result = Joi.validate(data, schema, options);
	return result.error;
};
