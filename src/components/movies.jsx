import React, { Component } from "react";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import UserRatingScorecard from "../common/userRatingScorecard";
import ContactForm from "../common/contactForm";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import Search from "./search";
import axios from "axios";
import config from "../utils/config.json";
import { toast } from "react-toastify";
import GoogleMaps from "../common/googleMaps";

const { baseUrl, port, moviesUrl } = config;
class Movies extends Component {
	state = {
		movies: [],
		pagination: {},
		filtering: {},
		sorting: {},
		searching: {},
	};

	constructor() {
		super();
		this.state = {
			movies: [],
			pagination: {
				currentPage: 1,
				recordsPerPage: 3,
			},
			filtering: {
				currentGenre: "All Genres",
			},
			sorting: {
				currentSortByColumn: "",
				sortType: "",
			},
			searching: {
				searchTerm: "",
			},
		};
	}

	componentDidMount() {
		this.getMoviesFromDb();
		toast("Welcome!", {
			toastId: "welcome",
		});
	}

	getMoviesFromDb = async () => {
		const { data: movies } = await axios.get(`${baseUrl}:${port}${moviesUrl}`);
		const reversed = movies.reverse();
		this.setState({ movies: reversed });
	};

	toggleLike = async (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movie };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePagination = (e) => {
		const page = Number(e.target.innerText);
		const pagination = { ...this.state.pagination };
		pagination.currentPage = page;
		this.setState({ pagination });
	};

	filterMovies = (movies) => {
		const { currentGenre } = this.state.filtering;
		if (currentGenre === "All Genres") return movies;
		const filteredMovies = movies.filter(
			(movie) => movie.genre.name === currentGenre
		);
		return filteredMovies;
	};

	sortMovies = (movies) => {
		if (!movies || !movies.length) return [];

		const { currentSortByColumn, sortType } = this.state.sorting;
		if (!currentSortByColumn) return movies;
		const columns = {
			Title: "title",
			Genre: "genre.name",
			Stock: "numberInStock",
			Rate: "dailyRentalRate",
		};
		return _.orderBy(movies, [columns[currentSortByColumn]], [sortType]);
	};

	getGenres = () => {
		const { movies } = this.state;
		const genres = ["All Genres"];
		movies.forEach((movie) => {
			if (!genres.includes(movie.genre.name)) genres.push(movie.genre.name);
		});
		return genres;
	};

	handleDelete = async (movie) => {
		const previousMovies = [...this.state.movies];
		const id = movie._id;
		const movies = this.state.movies.filter((m) => m._id !== id);
		this.setState({ movies });

		try {
			await axios.delete(`${baseUrl}:${port}${moviesUrl}/${id}`);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				toast.error("The movie has already been deleted");
			} else {
				toast.error("Something went wrong");
			}
			this.setState({ previousMovies });
		}
	};

	handlePrevious = () => {
		const { currentPage } = this.state.pagination;
		if (currentPage === 1) return;
		const pagination = { ...this.state.pagination };
		pagination.currentPage = currentPage - 1;
		this.setState({ pagination });
	};

	handleNext = (lastPage) => {
		const { currentPage } = this.state.pagination;
		if (currentPage === lastPage) return;
		const pagination = { ...this.state.pagination };
		pagination.currentPage = currentPage + 1;
		this.setState({ pagination });
	};

	clearSearchTerm = () => {
		const searching = { ...this.state.searching };
		searching.searchTerm = "";
		this.setState({ searching });
	};

	handleFiltering = (e) => {
		this.clearSearchTerm();
		const filtering = { ...this.state.filtering };
		filtering.currentGenre = e.target.innerText;
		this.setState({ filtering });
	};

	handleSort = (name) => {
		const sorting = { ...this.state.sorting };
		if (sorting.currentSortByColumn === name) {
			sorting.sortType = sorting.sortType === "asc" ? "desc" : "asc";
		} else {
			sorting.currentSortByColumn = name;
			sorting.sortType = "asc";
		}
		this.setState({ sorting });
	};

	handleSearch = (e) => {
		this.clearSelectedGenre();
		this.resetCurrentPage();
		const searchTerm = e.target.value;
		const searching = { ...this.state.searching };
		searching.searchTerm = searchTerm;
		this.setState({ searching });
		this.searchMovies();
	};

	clearSelectedGenre = () => {
		const filtering = { ...this.state.filtering };
		filtering.currentGenre = "All Genres";
		this.setState({ filtering });
	};

	resetCurrentPage = () => {
		const pagination = { ...this.state.pagination };
		pagination.currentPage = 1;
		this.setState({ pagination });
	};

	searchMovies = () => {
		const searchTerm = this.state.searching.searchTerm;
		const movies = this.state.movies;
		const results = movies.filter((movie) =>
			movie.title.toLowerCase().match("^" + searchTerm.toLowerCase())
		);
		return results;
	};

	showNumberOfMovies = (movies) => {
		const { length: count } = movies;
		return count ? <p>Showing {count} movies</p> : <p>There are no movies</p>;
	};

	render() {
		const { searchTerm } = this.state.searching;
		let movies = !searchTerm ? this.state.movies : this.searchMovies();
		if (movies.length === 0 && !searchTerm)
			return <p>There are no movies in the database</p>;

		const moviesAll = [...this.state.movies];
		const { currentSortByColumn, sortType } = this.state.sorting;
		const { currentPage, recordsPerPage } = this.state.pagination;

		if (!searchTerm) {
			movies = this.filterMovies(movies);
		}
		const sortedMovies = this.sortMovies(movies);
		const paginatedMovies = paginate(sortedMovies, currentPage, recordsPerPage);

		return (
			<div className="MainContainer">
				<div className="container text-center">
					<div className="row">
						<div className="col col-md-3">
							<ListGroup
								items={this.getGenres()}
								currentItem={this.state.filtering.currentGenre}
								onFilter={this.handleFiltering}
							/>
						</div>
						<div className="col">
							<div>
								<NavLink
									to="/movies/new"
									state={{ moviesAll }}
									type="button"
									className="btn btn-primary mb-3"
								>
									New Movie
								</NavLink>
								{this.showNumberOfMovies(paginatedMovies)}
								<Search searchTerm={searchTerm} onSearch={this.handleSearch} />
								<MoviesTable
									moviesAll={movies}
									movies={paginatedMovies}
									currentSortByColumn={currentSortByColumn}
									sortType={sortType}
									onRenderMovies={this.renderMovies}
									onSort={this.handleSort}
									onLike={this.toggleLike}
									onDelete={this.handleDelete}
								/>
								<Pagination
									onPagination={this.handlePagination}
									onPrevious={this.handlePrevious}
									onNext={this.handleNext}
									totalMovies={movies.length}
									recordsPerPage={this.state.pagination.recordsPerPage}
									currentPage={this.state.pagination.currentPage}
								/>
							</div>
						</div>
					</div>
				</div>
				<UserRatingScorecard />
				<ContactForm />
				<GoogleMaps />
			</div>
		);
	}
}

export default Movies;
