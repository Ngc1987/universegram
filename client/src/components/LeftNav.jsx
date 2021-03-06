import React from 'react'
import { NavLink } from "react-router-dom"
import { useContext } from 'react';
import { UidContext } from './AppContext';

const LeftNav = () => {

	const {uid} = useContext(UidContext)

	return (
		<div className="left-nav-container">
			<div className="icons">
				<div className="icons-bis">
					<NavLink to="/home" activeclassname="active-left-nav">
						<img src="/img/icons/home.svg" alt="Home logo" />
					</NavLink>
					<br />
					<NavLink to={`/profil/${uid}`} activeclassname="active-left-nav">
						<img src="/img/icons/user.svg" alt="User logo" />
					</NavLink>
					<br />
					<NavLink to="/chat" activeclassname="active-left-nav">
						<img src="/img/icons/message2.svg" alt="Message logo" />
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default LeftNav