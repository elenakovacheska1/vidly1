import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "./css/SocialMedia.css";
import ProtectedRoute from "./common/protectedRoute";
import NavBar from "./common/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./common/notFound";
import Movie from "./components/movie";
import Profile from "./components/profile";
import Login from "./components/login";
import Logout from "./components/logout";
import Register from "./components/register";
import MovieForm from "./components/MovieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFromLocalDb } from "./services/localdbService";
import jwtDecode from "jwt-decode";
import Chatbot from "./components/chatBot";
import SocialMediaIcons from "./common/socialMedia";

class App extends Component {
	state = {};

	componentDidMount() {
		try {
			const jwt = getFromLocalDb("token");
			const user = jwtDecode(jwt);
			this.setState({ user });
		} catch (ex) {}
	}

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={user} />
				<Chatbot />
				<SocialMediaIcons />
				{/* <UserRatingScorecard /> */}
				<div className="container">
					<Routes>
						<Route path="/profile" element={<Movies />} />
						<Route path="/register" element={<Register />} />
						<Route path="/logout" element={<Logout />} />
						<Route
							path="/login"
							element={user ? <Navigate to="/movies" /> : <Login />}
						/>
						<Route path="/movies/new" element={<MovieForm />} />
						<Route path="/movies/:id" element={<Movie />} />
						<Route path="/movies" element={<Movies />} />
						<Route path="/customers" element={<Customers />} />
						<Route
							path="/rentals"
							element={<ProtectedRoute user={user} component={<Rentals />} />}
						/>
						<Route path="/" element={<Navigate to="/movies" />} />
						<Route path="/not-found" element={<NotFound />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
