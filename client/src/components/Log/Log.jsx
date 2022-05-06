import React, { useState } from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import PropTypes from 'prop-types';


/**
 * @component
 * @description Component Log displayed if the user isn't connected. Is showing two buttons to choose if he want to connect or register, and show the corresponding form.
 */
function Log({ signin, signup }) {

	// Two states to choose if we display the signUp or signIn form
	const [signUpForm, setSignUpForm] = useState(signup);
	const [signInForm, setSignInForm] = useState(signin);

	// Function to change the displayed form when click on the selected button
	const handleForms = (e) => {
		if (e.target.id === "register") {
			setSignUpForm(true);
			setSignInForm(false);
		} else if (e.target.id === "login") {
			setSignUpForm(false);
			setSignInForm(true);
		}
	}

	return (
		<div className="connection-form">
			<div className="form-container">
				<ul>
					<li onClick={handleForms} id="register" className={signUpForm ? "active-btn" : undefined} >S'inscrire</li>
					<li onClick={handleForms} id="login" className={signInForm ? "active-btn" : undefined} >Se connecter</li>
				</ul>
				{signUpForm && <SignUpForm />}
				{signInForm && <SignInForm />}
			</div>
		</div>
	)
}

Log.propTypes = {
	/**
	 * Boolean to tell if signin or signup component is displayed. If false, signup is true, if true signup is false
	 */
	signin: PropTypes.bool.isRequired,
	/**
	 * Boolean to tell if signin or signup component is displayed. If false, signin is true, if true signin is false
	 */
	signup: PropTypes.bool.isRequired
}

export default Log;