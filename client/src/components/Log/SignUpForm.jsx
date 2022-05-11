import React, { useState } from 'react';
import axios from "axios";
import SignInForm from "./SignInForm";


/**
 * @component
 * @description Component SignIn form, is the form to register the user
 */
const SignUpForm = () => {

	// States to take the inputs values
	const [formSubmit, setFormSubmit] = useState(false);
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [planet, setPlanet] = useState("");
	const [galaxy, setGalaxy] = useState("");
	const [controlPassword, setControlPassword] = useState("");


	// Function to register the user or display the errors
	const handleRegister = async (e) => {
		e.preventDefault();

		const terms = document.getElementById("terms");
		const pseudoError = document.querySelector(".pseudo.error");
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");
		const passwordConfirmError = document.querySelector(".password-confirm.error");
		const termsError = document.querySelector(".terms.error");

		passwordConfirmError.innerHTML = "";
		termsError.innerHTML = "";

		if (password !== controlPassword || !terms.checked) {
			if (password !== controlPassword) {
				passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas.";
			}

			if (!terms.checked) {
				termsError.innerHTML = "Vous devez accepter les conditions générales.";
			}
		} else {
			await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}/api/user/register`,
				data: {
					pseudo,
					email,
					password,
					planet,
					galaxy
				}
			})
			.then((res) => {
				console.log(res)
				if (res.data.errors) {
					pseudoError.innerHTML = res.data.errors.pseudo;
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					setFormSubmit(true);
				}
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}

	return (

		formSubmit ? 
			<>
				<SignInForm/>
				<span></span>
				<h4 className="register success" >Enregistrement réussi, veuillez vous connecter.</h4>
			</>
			:

			<form action="" onSubmit={handleRegister} id="sign-up-form">
				<label htmlFor="pseudo">Pseudo</label>
				<input type="text"
					name="pseudo"
					id="pseudo"
					onChange={(e) => setPseudo(e.target.value)}
					value={pseudo}
					required
				/>
				<div className="pseudo error"></div>
				<br />

				<label htmlFor="email">Email</label>
				<input type="email"
					name="email"
					id="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
				/>
				<div className="email error"></div>
				<br />

				<label htmlFor="planet">Planète</label>
				<input type="text"
					name="planet"
					id="planet"
					onChange={(e) => setPlanet(e.target.value)}
					value={planet}
					min={2}
					required
				/>
				{/* <div className="email error"></div> */}
				<br />

				<label htmlFor="galaxy">Galaxie</label>
				<input type="text"
					name="galaxy"
					id="galaxy"
					onChange={(e) => setGalaxy(e.target.value)}
					value={galaxy}
					min={2}
					required
				/>
				{/* <div className="email error"></div> */}
				<br />

				<label htmlFor="password">Mot de passe</label>
				<input type="password"
					name="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
				<div className="password error"></div>
				<br />

				<label htmlFor="password-conf">Confirmer le mot de passe</label>
				<input type="password"
					name="controlPassword"
					id="password-conf"
					onChange={(e) => setControlPassword(e.target.value)}
					value={controlPassword}
					required
				/>
				<div className="password-confirm error"></div>
				<br />

				<label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer" >conditions générales</a><span> <input type="checkbox" id="terms" /></span></label>
				
				<div className="terms error"></div>

				<input type="submit" value="Valider inscription" />
			</form>
		
		
	)
}

SignUpForm.propTypes = {

}

export default SignUpForm;