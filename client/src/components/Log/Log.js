import React, { useState } from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = ({signin, signup}) => {

	const [signUpModale, setSignUpModale] = useState(signup);
	const [signInModale, setSignInModale] = useState(signin);

	const handleModales = (e) => {
		if(e.target.id === "register") {
			setSignUpModale(true);
			setSignInModale(false);
		} else if(e.target.id === "login") {
			setSignUpModale(false);
			setSignInModale(true);
		}
	}

	return (
		<div className="connection-form">
			<div className="form-container">
				<ul>
					<li onClick={handleModales} id="register" className={signUpModale && "active-btn"} >S'inscrire</li>
					<li onClick={handleModales} id="login" className={signInModale && "active-btn"} >Se connecter</li>
				</ul>
				{signUpModale && <SignUpForm/>}
				{signInModale && <SignInForm/>}
			</div>
		</div>
	)
}

export default Log;