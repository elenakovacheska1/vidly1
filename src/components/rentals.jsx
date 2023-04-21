import React, { Component } from "react";
import axios from "axios";
import MovieCard from "../common/movieCard";

class Rentals extends Component {
	state = { movies: [] };

	componentDidMount() {
		this.getMovies("Friends");
	}

	getMovies = async (searchText) => {
		const movies = await axios.get(
			`http://www.omdbapi.com/?i=tt3896198&apikey=44592b2c&s=${searchText}`
		);
		this.setState({ movies: movies.data.Search });
	};

	render() {
		console.log(this.state.movies);
		const { movies } = this.state;
		return (
			<React.Fragment>
				{movies.map((movie) => (
					<MovieCard
						key={movie.imdbID}
						title={movie.Title}
						poster={movie.Poster}
						year={movie.Year}
						type={movie.Type}
					/>
				))}
			</React.Fragment>
		);
	}
}

export default Rentals;
