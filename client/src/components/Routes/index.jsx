import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Trending from "../../pages/Trending";
import LeftNav from "../LeftNav";
import Particles from 'particlesjs';


/**
 * @component
 * @description Component which contains all the routes of the application
 */
const AppRouter = () => {

	window.onload = function () {
		Particles.init({
			selector: '.background',
			color: '#fff',
		});
	};

	return (
		<Router>
		<Navbar/>
		<LeftNav/>
		<canvas class="background"></canvas>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profil" element={<Profile />} />
				<Route path="/trending" element={<Trending />} />
				<Route path="*" element={<Navigate replace to="/" />} />
			</Routes>
		</Router>
	)
}

AppRouter.propTypes = {

}

export default AppRouter;