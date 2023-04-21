import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MovieForm from "./MovieForm";

const Movie = (props) => {
	const { id } = useParams();
	const location = useLocation();
	if (!location.state) {
		// Redirect to not found
		window.location.replace("/not-found");
	} else {
		return (
			<React.Fragment>
				<h1>Movie Id: {id}</h1>
				<MovieForm movies={location.state.moviesAll} id={id} />
			</React.Fragment>
		);
	}
};

export default Movie;
