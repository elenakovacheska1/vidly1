import React, { Component } from "react";
import Like from "../common/like";
import { NavLink } from "react-router-dom";

class MoviesTable extends Component {
	generateSortIconClasses = (columnName) => {
		const { currentSortByColumn, sortType } = this.props;
		if (currentSortByColumn === columnName) {
			if (sortType === "asc") return "fa-solid fa-sort-up";
			else if (sortType === "desc") return "fa-solid fa-sort-down";
		}
		return "fa-solid fa-sort";
	};

	render() {
		const { moviesAll, movies, onSort, onLike, onDelete } = this.props;
		const styles = { cursor: "pointer" };
		const columnNames = ["Title", "Genre", "Stock", "Rate"];
		return (
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							{columnNames.map((name) => (
								<th
									key={name}
									onClick={() => onSort(name)}
									style={styles}
									scope="col"
								>
									{name} <i className={this.generateSortIconClasses(name)}></i>
								</th>
							))}
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => (
							<tr key={movie._id}>
								<td>
									<NavLink to={`/movies/${movie._id}`} state={{ moviesAll }}>
										{movie.title}
									</NavLink>
								</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like onLike={() => onLike(movie)} isLiked={movie.liked} />
								</td>
								<td>
									<button
										onClick={() => onDelete(movie)}
										type="button"
										className="btn btn-danger btn-sm"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default MoviesTable;
