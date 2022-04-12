const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err);
			} else {
				console.log(decodedToken.id);
				next();
			}
		})
	} else {
		console.log("No token")
	}
}