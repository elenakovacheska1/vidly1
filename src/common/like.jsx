import React from "react";

const Like = (props) => {
	const { onLike, isLiked } = props;
	const classes = "fa fa-heart";
	return (
		<i
			onClick={onLike}
			style={{ cursor: "pointer" }}
			className={isLiked ? classes : classes + "-o"}
			aria-hidden="true"
		></i>
	);
};

export default Like;
