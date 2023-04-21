import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
	getNumPages = () => {
		const { totalMovies, recordsPerPage } = this.props;
		return Math.ceil(totalMovies / recordsPerPage);
	};

	styles = { cursor: "pointer", color: "black" };

	renderPages = () => {
		const totalPages = this.getNumPages();

		const pagesArray = _.range(1, totalPages + 1);
		const { currentPage, onPagination } = this.props;

		return pagesArray.map((page) => (
			<li
				key={page}
				style={this.styles}
				className={currentPage === page ? "page-item active" : "page-item"}
			>
				<button
					onClick={onPagination}
					className="page-link"
					style={this.styles}
				>
					{page}
				</button>
			</li>
		));
	};

	render() {
		const { onPrevious, onNext, currentPage, totalMovies } = this.props;
		if (!totalMovies) return;

		const totalPages = this.getNumPages();
		if (totalPages === 1) return;

		const lastPage = this.getNumPages();
		return (
			<nav
				style={{ display: "inline-block" }}
				aria-label="Page navigation example"
			>
				<ul className="pagination">
					<li className="page-item" style={this.styles}>
						<button
							onClick={onPrevious}
							style={this.styles}
							className={
								currentPage === 1 ? "page-link btn disabled" : "page-link btn"
							}
						>
							Previous
						</button>
					</li>
					{this.renderPages()}
					<li className="page-item" style={this.styles}>
						<button
							onClick={() => onNext(lastPage)}
							className={
								currentPage === lastPage
									? "page-link btn disabled"
									: "page-link btn"
							}
							style={this.styles}
						>
							Next
						</button>
					</li>
				</ul>
			</nav>
		);
	}
}

Pagination.propTypes = {
	onPagination: PropTypes.func,
	totalMovies: PropTypes.number,
	recordsPerPage: PropTypes.number,
	currentPage: PropTypes.number,
};

export default Pagination;
