import React, { Component } from "react";
import "../css/movieCard.css";
import { toast } from "react-toastify";

class MovieCard extends Component {
	state = {};

	styles = {
		background: `url(${this.props.poster})`,
		backgroundSize: "cover",
		backgroundPosition: "100% 80%",
	};

	render() {
		return (
			<React.Fragment>
				<div className="containerMovie">
					<div className="movie-card">
						<div className="movie-header" style={this.styles}>
							<div className="header-icon-container">
								<a href="#">
									<i class="material-icons header-icon"></i>
								</a>
							</div>
						</div>
						<div className="movie-content">
							<div className="movie-content-header">
								<a href="#">
									<h3 className="movie-title">{this.props.title}</h3>
								</a>
								<div className="imax-logo"></div>
							</div>
							<div className="movie-info">
								<div className="info-section">
									<label>Year</label>
									<span>{this.props.year}</span>
								</div>
								<div className="info-section">
									<label>Type</label>
									<span>{this.props.type}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default MovieCard;
