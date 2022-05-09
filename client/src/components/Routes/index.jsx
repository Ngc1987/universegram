import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
const AppRouter = ({setUid}) => {

	const uid = useContext(UidContext);
	console.log(uid)

	
	window.onload = function () {
		Particles.init({
			selector: '.background',
			color: '#fff',
		});
	};
	
	
	return (
		<div className="App">

		<Router>
			<Navbar setUid={setUid} />
			<canvas className="background"></canvas>
			{/* {uid && <LeftNav />} */}

			<Routes>
			
				<Route path="/" element={<Login />}/>
				{/* <Route path="/" element={<Login />} /> */}
				<Route path="/home" element={<Home />} />
				<Route path="/profil/:id" element={<Profile />} />
				<Route path="/trending" element={<Trending />} />
				<Route path="*" element={<Navigate replace to={uid ? "/home" : "/"} />} />
			
			
			</Routes>
		</Router>
		</div>
	)
}

AppRouter.propTypes = {

}

export default AppRouter;