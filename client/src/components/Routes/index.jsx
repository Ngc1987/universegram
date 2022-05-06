import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Trending from "../../pages/Trending";
import LeftNav from "../LeftNav";
import Particles from 'particlesjs';
import Log from "../Log/Log";
import Login from "../../pages/Login";
import { useContext } from "react";
import { UidContext } from './../AppContext';


/**
 * @component
 * @description Component which contains all the routes of the application
 */
const AppRouter = () => {

	const uid = useContext(UidContext);

	console.log(uid)

	window.onload = function () {
		Particles.init({
			selector: '.background',
			color: '#fff',
		});
	};

	return (
		<Router>
			<Navbar />
			<canvas className="background"></canvas>

			<Routes>
			
				{/* <Route path="/" element={uid ? <Navigate replace to="/home" /> : } /> */}
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/profil" element={<Profile />} />
				<Route path="/trending" element={<Trending />} />
				<Route path="*" element={<Navigate replace to={uid ? "/home" : "/"} />} />
			
			
			</Routes>
		</Router>
	)
}

AppRouter.propTypes = {

}

export default AppRouter;