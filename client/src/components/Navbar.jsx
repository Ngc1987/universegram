import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import useWindowSize from "../hooks/useWindowSize";

/**
 * @component
 * @description This component is the header of the app. It contains the app name and logo, the user name if is connected, and the disconnect button.
 */
const Navbar = () => {

	const uid = useContext(UidContext);
	const userData = useSelector((state) => state.userReducer);
	const dimensions = useWindowSize();


	return (
		<nav>
				<div className="logo">
					<NavLink to="/home">
						<div className="logo">
							<img src="/img/icons/galaxy.svg" alt="" />
							<h3>UniverseGram</h3>
						</div>
					</NavLink>
				</div>
				{uid ?
					<>
						<div className="welcome">
							<NavLink to={`/profil/${uid}`}>
							{dimensions.width > 550  &&
								<h5>Bienvenue {userData.pseudo}</h5>
							}
							</NavLink>
							<Logout/>
						</div>
					</>
					:
					<div className="welcome">
						<NavLink to="/">
							<img src="/img/icons/login.svg" alt="login" />
						</NavLink>
					</div>
				}
		</nav>
	)
}

Navbar.propTypes = {

}

export default Navbar;