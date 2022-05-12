import React, { useContext, useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
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

	const search = useRef(null);

	const [inputValue, setInputValue] = useState("");
	const [showInput, setShowInput] = useState(false);

	useEffect(() => {
		function closeInput(e) {
			// console.log(e)
			if (e.target.id !== "search" && e.target.id !== "loupe") {
				setShowInput(false);
				setInputValue("")
			}

		}

		if(showInput) {
			search.current.focus()
		}
		
		window.addEventListener("click", closeInput)

		return () => window.removeEventListener("click", closeInput)
	})

	const searchUsers = (e) => {
		let value = e.target.value;
		setInputValue(value);
	}


	// console.log(search)

	return (
		<nav className="navbar">
				<div className="logo">
					<NavLink to={uid.uid === null ? "/" : "/home"}>
						<div className="logo">
							<img src="/img/icons/galaxy.svg" alt="" />
						{dimensions.width < 300 ? <h3 className="smallTitle" >Universe Gram</h3>:
							dimensions.width > 767 ? <h3>UniverseGram</h3> 
						:
							dimensions.width < 768 && !showInput && <h3>UniverseGram</h3>}
						</div>
					</NavLink>
				</div>
				{uid ?
					<>
					{
						!showInput ? 
							<img id="loupe" src={process.env.PUBLIC_URL + "/img/icons/loupe.svg"} alt="loupe" onClick={() => {setShowInput(true); search.current.focus()}} />
						:
						<div className="search">
						{dimensions.width < 400 && <img id="loupe" src={process.env.PUBLIC_URL + "/img/icons/loupe.svg"} alt="loupe" onClick={() => {setShowInput(true); search.current.focus()}} />}
							<label htmlFor="search"></label>
							<input type="search" id="search" ref={search} onChange={searchUsers} />
							<ul>
								{inputValue.length > 1 && usersData.filter((user) => user.pseudo.toLowerCase().includes(inputValue.toLowerCase())).map((user) => {
									
										return (
											<Link to={`/profil/${user._id}`} >
												<li key={user._id} className="search__user" onClick={() => {setShowInput(!showInput); setInputValue("")}}>
													<img src={user.picture.slice(1)} alt={user.pseudo + "-pic"} />
													<p>{user.pseudo}</p>
												</li>
											</Link>
										)
									
									
								})}
							</ul>	
						</div>
					}
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