const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const signUpErrors = require("../utils/signUpErrors");
const signInErrors = require("../utils/signInErrors");

const maxAge = 3 * 24 * 60 * 60 * 1000 // 3 days
const createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: maxAge
	})
}

module.exports.signUp = async (req, res) => {
	const { pseudo, email, password, planet, galaxy } = req.body;

	try {
		const user = await UserModel.create({ pseudo, email, password, planet, galaxy });
		res.status(201).json({ user: user._id });
	}
	catch (err) {
		const errors = signUpErrors(err);
		res.status(200).send({ errors });
	}
}

module.exports.signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.login(email, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, {
			maxAge: maxAge, sameSite: "none",
			secure: true,
		})
		res.status(200).json({ user: user._id })

	}
	catch (err) {
		const errors = signInErrors(err);
		res.status(200).json({ errors });
		// console.log(err)
	}
}

module.exports.logout = async (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	// res.redirect("/");
	res.status(200).send("Logout success")
}