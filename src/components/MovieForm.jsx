import React, { Component } from "react";
import FormGroup from "../common/formGroup";
import DisplayError from "../common/displayError";
import withRouter from "../common/withRouter";
import Joi from "joi-browser";
import { getErrorMessage, validateForm } from "../common/validate";
import axios from "axios";
import config from "../utils/config.json";
import { delay } from "../common/delay";
import { toast } from "react-toastify";

const { baseUrl, port, moviesUrl, genresUrl } = config;

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
		title: Joi.string().min(5).required().label("Title"),
		genre: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.integer()
			.min(0)
			.max(100)
			.required()
			.label("Number In Stock"),
		rate: Joi.number().min(0).max(10).required().label("Rate"),
	};

	getGenresFromDb = async () => {
		const { data: genres } = await axios.get(`${baseUrl}:${port}${genresUrl}`);
		return genres;
	};

	setGenreNames = async () => {
		const genres = await this.getGenresFromDb();
		const genreNames = genres.map((genre) => genre.name);
		genreNames.unshift("");
		this.setState({ genreNames });
	};

	updateMovie = async (id) => {
		const { data: movies } = await axios.get(`${baseUrl}:${port}${moviesUrl}`);
		const movie = movies.find((m) => m._id === id);
		const { title, genre: genreName, numberInStock, rate } = this.state.movie;
		const genres = await this.getGenresFromDb();
		const genreId = genres.find((g) => g.name === genreName)._id;
		delete movie._id;
		delete movie.genre;
		movie.title = title;
		movie.genreId = genreId;
		movie.numberInStock = numberInStock;
		movie.dailyRentalRate = rate;
		await axios.put(`${baseUrl}:${port}${moviesUrl}/${id}`, movie);
	};

	saveNewMovie = async () => {
		const { title, genre, numberInStock, rate } = this.state.movie;
		if (!(title && genre && numberInStock && rate)) return;

		const genresFromDb = await this.getGenresFromDb();
		const genreId = genresFromDb.filter((g) => g.name === genre)[0]._id;

		let movie = {
			title,
			genreId,
			numberInStock: Number(numberInStock),
			dailyRentalRate: Number(rate),
		};

		await axios.post(`${baseUrl}:${port}${moviesUrl}`, movie);
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

		toast("Saving...");
		delay(1000).then(() => (window.location = "/movies"));
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
