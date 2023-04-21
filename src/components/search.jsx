import React, { Component } from "react";

class Search extends Component {
	render() {
		const { searchTerm, onSearch } = this.props;
		return (
			<div className="form-outline mb-3">
				<input
					type="search"
					id="form1"
					name="search"
					value={searchTerm}
					className="form-control"
					placeholder="Search"
					aria-label="Search"
					onChange={(e) => onSearch(e)}
				/>
			</div>
		);
	}
}

export default Search;
