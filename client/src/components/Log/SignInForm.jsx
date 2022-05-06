import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from "../../actions/user.actions";


/**
 * @component
 * @description Component SignIn form, is the form to connect the user
 */
const SignInForm = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// States to take the inputs values
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Function to login the user or display the errors
	const handleLogin = (e) => {
		e.preventDefault();

		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");


		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}/api/user/login`,
			withCredentials: true,
			data: {
				email,
				password
			}
		})

			.then((res) => {
				console.log(res)
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					dispatch(getUser(res.data.user));
					navigate("/home")
				}
				
			})
			.catch((err) => {
				console.log(err + "C'est chelou");
			})
	}

	return (
		<form action="" onSubmit={handleLogin} id="sign-up-form" >
			<label htmlFor="email">Email</label>
			<input type="text"
				name="email"
				id="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email} />
			<div className="email error"></div>
			<br />

			<label htmlFor="password">Mot de passe</label>
			<input type="password"
				name="password"
				id="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password} />
			<div className="password error"></div>
			<br />

			<input type="submit" value="Se connecter" />
		</form>
	)
}

SignInForm.propTypes = {
	
}

export default SignInForm;