import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import "../css/navbar.css";
import "../css/buttons.css";
import Button from "./button";

const NavBar = ({ user }) => {
	const buttonClass = "glow-on-hover";
	return (
		<nav className="justify-content-center text-center nav navbar navbar-dark bg-dark navbar-expand-lg mb-5">
			<ul className="nav navbar-nav justify-content-start">
				<li className="nav-item">
					<span className="TextGradient1 logo navbar-brand mb-0 h1">
						💫𝓥𝓲𝓭𝓵𝔂👋
					</span>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink className="TextGradient1 NavText nav-link" to="/movies">
								Movies
							</NavLink>
						}
					/>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink
								className="TextGradient1 NavText nav-link"
								to="/customers"
							>
								Customers
							</NavLink>
						}
					/>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink className="TextGradient1 NavText nav-link" to="/rentals">
								Rentals
							</NavLink>
						}
					/>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink
								className="TextGradient1 NavText nav-link"
								to="/register"
							>
								Register
							</NavLink>
						}
					/>
				</li>
				{!user && (
					<li className="nav-item">
						<Button
							className={buttonClass}
							component={
								<NavLink className="TextGradient1 NavText nav-link" to="/login">
									Login
								</NavLink>
							}
						/>
					</li>
				)}
				{user && (
					<React.Fragment>
						<li className="nav-item">
							<Button
								className={buttonClass}
								component={
									<NavLink
										className="TextGradient1 NavText nav-link"
										to="/logout"
									>
										Logout
									</NavLink>
								}
							/>
						</li>
						<li className="nav-item">
							<NavLink
								className="TextGradient1 vcenter nav-link gradientText"
								to="/profile"
							>
								Welcome {user.name}
							</NavLink>
						</li>
					</React.Fragment>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
