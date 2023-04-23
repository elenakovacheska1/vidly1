import React, { Component } from "react";
import FormGroup from "../common/formGroup";
import DisplayError from "../common/displayError";
import withRouter from "../common/withRouter";
import Joi from "joi-browser";
import { getErrorMessage, validateForm } from "../common/validate";
import { toast } from "react-toastify";
import { saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Component {
	state = {
		movie: {
			title: "",
			genre: "",
			numberInStock: "",
			rate: "",
		},
		errors: { title: "", genre: "", numberInStock: "", rate: "" },
		genreNames: [],
	};

	constructor(props) {
		super(props);
		const id = this.props.id;
		if (!id) return;
		const movies = this.props.location.state.moviesAll;
		const movie = movies.filter((movie) => movie._id === id)[0];
		this.state = {
			movies: this.props.location.state.moviesAll,
			movie: {
				title: movie.title,
				genre: movie.genre.name,
				numberInStock: movie.numberInStock,
				rate: movie.dailyRentalRate,
			},
			errors: { title: "", genre: "", numberInStock: "", rate: "" },
			genreNames: [],
		};
	}

	componentDidMount() {
		this.setGenreNames();
	}

	schema = {
		title: Joi.string()
			.min(5)
			.required()
			.label("Title"),
		genre: Joi.string()
			.required()
			.label("Genre"),
		numberInStock: Joi.number()
			.integer()
			.min(0)
			.max(100)
			.required()
			.label("Number In Stock"),
		rate: Joi.number()
			.min(0)
			.max(10)
			.required()
			.label("Rate"),
	};

	getGenresFromDb = () => {
		return getGenres();
	};

	setGenreNames = () => {
		const genres = this.getGenresFromDb();
		const genreNames = genres.map((genre) => genre.name);
		genreNames.unshift("");
		this.setState({ genreNames });
	};

	updateMovie = (id) => {
		const movies = this.props.location.state.moviesAll;
		const movie = movies.find((m) => m._id === id);
		const { title, genre: genreName, numberInStock, rate } = this.state.movie;
		const genres = this.getGenresFromDb();
		const genreObj = genres.find((g) => g.name === genreName);
		delete movie.genre;
		movie.title = title;
		movie.genre = genreObj;
		movie.numberInStock = numberInStock;
		movie.dailyRentalRate = rate;
		saveMovie(movie);
	};

	saveNewMovie = () => {
		const { title, genre, numberInStock, rate } = this.state.movie;
		if (!(title && genre && numberInStock && rate)) return;

		const genresFromDb = this.getGenresFromDb();
		const genreObj = genresFromDb.filter((g) => g.name === genre)[0];

		let movie = {
			_id: window.crypto.randomUUID(),
			title,
			genre: genreObj,
			numberInStock: Number(numberInStock),
			dailyRentalRate: Number(rate),
		};

		saveMovie(movie);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = validateForm(this.state.movie, this.schema);
		if (errors) return;
		const { id } = this.props;
		if (!id) {
			// Save new movie
			this.saveNewMovie();
		} else {
			// Update movie
			this.updateMovie(this.props.id);
		}

		toast("Saved. Go back.");
	};

	handleChange = (e) => {
		// Update field values
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		const movie = { ...this.state.movie };
		movie[fieldName] = fieldValue;
		// Update error message
		const errorMessage = getErrorMessage(fieldName, fieldValue, this.schema);
		const errors = { ...this.state.errors };
		errors[fieldName] = errorMessage;
		this.setState({ movie, errors });
	};

	renderMovieForm = (movie, errors, title, genre, numberInStock, rate) => {
		const { genreNames } = this.state;
		return (
			<form className="MainContainer">
				<FormGroup
					fieldLabel="Title"
					fieldName="title"
					fieldValue={title}
					onChange={this.handleChange}
					type="text"
					placeholder="Enter title"
				/>
				<DisplayError errorMessage={errors.title} />

				<div className="form-group">
					<label htmlFor="genre">Genre</label>
					<select
						className="form-control"
						id="genre"
						name="genre"
						onChange={this.handleChange}
						value={genre}
					>
						{genreNames.map((genre, id) => (
							<option key={id}>{genre}</option>
						))}
					</select>
				</div>
				<DisplayError errorMessage={errors.genre} />

				<FormGroup
					fieldLabel="Number in Stock"
					fieldName="numberInStock"
					fieldValue={numberInStock}
					onChange={this.handleChange}
					type="text"
					placeholder="Enter number in stock"
				/>
				<DisplayError errorMessage={errors.numberInStock} />

				<FormGroup
					fieldLabel="Rate"
					fieldName="rate"
					fieldValue={rate}
					onChange={this.handleChange}
					type="text"
					placeholder="Enter rate"
				/>
				<DisplayError errorMessage={errors.rate} />
				<button
					onClick={this.handleSubmit}
					type="submit"
					className="btn btn-primary"
					disabled={validateForm(movie, this.schema) ? true : false}
				>
					Save
				</button>
			</form>
		);
	};

	render() {
		const { movie } = this.state;
		const { title, genre, numberInStock, rate } = this.state.movie;
		const { errors } = this.state;
		return this.renderMovieForm(
			movie,
			errors,
			title,
			genre,
			numberInStock,
			rate
		);
	}
}

export default withRouter(MovieForm);
