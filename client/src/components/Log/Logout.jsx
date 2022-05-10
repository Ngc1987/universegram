import React from 'react';
import axios from "axios";
import cookie from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UidContext } from './../AppContext';
;

/**
 * @component
 * @description It's the Logout component
 */
const Logout = ({type}) => {

	const navigate = useNavigate();
	const {uid, setUid} = useContext(UidContext)

	// Remove the cookie on the front-side
	const removeCookie= (key) => {
		if(window !== "undefined") {
			cookie.remove(key)
		}
	}

	// Disconnect the user and remove the cookie on the back side
	const logout = async () => {
		await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
			withCredentials: true,
		})
		.then(() => {
			removeCookie("jwt");
			setUid(null)
			navigate("/");
		})
		// .then(() => setUid(null), console.log(uid))
		.catch((err) => console.log(err))

		// window.location = "/";
	}

	// console.log(uid)

	return (
		type === "mobileNav" ?
			<p onClick={logout} >Déconnexion</p>
			:
			<div className="logout" onClick={logout} >
				<img src="/img/icons/logout.svg" alt="logout" />
			</div>
		
	)
}

Logout.propTypes = {

}

export default Logout;