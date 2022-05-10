import React, { useContext, useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import useWindowSize from "../hooks/useWindowSize";
import { isEmpty } from "../utils/isEmpty";

/**
 * @component
 * @description This component is the header of the app. It contains the app name and logo, the user name if is connected, and the disconnect button.
 */
const Navbar = () => {

	const uid = useContext(UidContext);
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const dimensions = useWindowSize();

	console.log(usersData)

	const [inputValue, setInputValue] = useState("");


	return (
		<nav className="navbar">
				<div className="logo">
					<NavLink to={uid.uid === null ? "/" : "/home"}>
						<div className="logo">
							<img src="/img/icons/galaxy.svg" alt="" />
							<h3>UniverseGram</h3>
						</div>
					</NavLink>
				</div>
				{uid ?
					<>
						<div className="search">

						<label htmlFor="search"></label>
						<input type="search" id="search" value={inputValue} onChange={(e) =>setInputValue(e.target.value)} />
						<ul>
							{!isEmpty(usersData[0]) && usersData.map((user) => {
								if (user.pseudo.toLowerCase().includes(inputValue.toLowerCase())) {
									return (
										<li key={user._id}  className="search__user">
											<img src={user.picture.slice(1)} alt={user.pseudo + "-pic"} />
											<p>{user.pseudo}</p>
										</li>
									)
								
								} return null
							})}
						</ul>	
						</div>
						<div className="welcome">
							{dimensions.width > 767  && uid.uid &&
								<>
									<NavLink to={`/profil/${uid.uid}`}>
										<h5>Bienvenue {userData.pseudo}</h5>
									</NavLink>
									<Logout type="desktopNav" />
								</>
							}
							
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