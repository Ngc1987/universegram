import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Trending from "../../pages/Trending";
import LeftNav from "../LeftNav";


/**
 * @component
 * @description Component which contains all the routes of the application
 */
const AppRouter = () => {
	return (
		<Router>
		<Navbar/>
		<LeftNav/>
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