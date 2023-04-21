import React, { Component } from "react";
import "../css/userCard.css";
import { toast } from "react-toastify";

class UserCard extends Component {
	state = {};
	styles = {
		backgroundImage: `url(${this.props.imageUrl})`,
	};

	handleFollow = () => {
		toast.success(`You followed ${this.props.name}`);
	};

	render() {
		return (
			<React.Fragment>
				<div className="card">
					<div className="card-header" style={this.styles}>
						<div className="card-header-slanted-edge">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200">
								<path className="polygon" d="M-20,200,1000,0V200Z" />
							</svg>
							<button
								href="#"
								onClick={this.handleFollow}
								className="btn-follow"
							>
								<span className="sr-only">Follow</span>
							</button>
						</div>
					</div>

					<div className="card-body">
						<h2 className="name">{this.props.name}</h2>
						<h4 className="job-title">{this.props.job}</h4>
						<div className="bio">{this.props.description}</div>
					</div>

					<div className="card-footer">
						<div className="stats">
							<div className="stat">
								<span className="label">Following</span>
								<span className="value">{this.props.following}</span>
							</div>
							<div className="stat">
								<span className="label">Followers</span>
								<span className="value">{this.props.followers}</span>
							</div>
							<div className="stat">
								<span className="label">Likes</span>
								<span className="value">{this.props.likes}</span>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default UserCard;
