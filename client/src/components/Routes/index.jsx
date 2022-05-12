import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { isEmpty } from './../../utils/isEmpty';
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../MobileNav/MobileNav";
import MessagesBox from './../MessagesBox';


/**
 * @component
 * @description Component which contains all the routes of the application
 */
const AppRouter = () => {

	const {uid} = useContext(UidContext);
	const userData = useSelector((state) => state.userReducer)
	
	const dimensions = useWindowSize()

	console.log(userData._id, userData[0])
	
	window.onload = function () {
		Particles.init({
			selector: '.background',
			color: '#fff',
		});
	};
	
	// State and functions for the mobile device menu
	const [isOpen, setIsOpen] = useState(false);
	const setOpen = () => {
		setIsOpen(!isOpen)
	}
	const onToggle = (toggled) => {
		toggled ? setIsOpen(true) : setIsOpen(false)
	}
	const handleOnClose = () => {
		setIsOpen(false)
	}
	
	return (
		<div className="App">

		<Router>
			<Navbar />
			<canvas className="background"></canvas>
			{/* {uid && <LeftNav />} */}
				{dimensions.width < 768 && <MobileNav
					isOpen={isOpen}
					setOpen={setOpen}
					onToggle={onToggle}
					handleOnClose={handleOnClose} />
					
					}
				{uid && dimensions.width > 767 && <LeftNav />}

			<Routes>
				<Route path="/" element={<Login />}/>
				
				{/* <Route path="/" element={<Login />} /> */}
				<Route path="/home" element={<Home />} />
				<Route path="/profil/:id" element={<Profile />} />
				<Route path="/chat" element={<MessagesBox />} />
				<Route path="*" element={<Navigate replace to={uid ? "/home" : "/"} />} />
			
			
			</Routes>
		</Router>
		</div>
	)
}

AppRouter.propTypes = {

}

export default AppRouter;