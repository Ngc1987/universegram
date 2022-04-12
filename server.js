const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes");
const checkUser = require("./middleware/checkUser");
const requireAuth = require("./middleware/requireAuth");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

// Read bodys and cookies on our requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt middleware
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
	res.status(200).send(res.locals.user._id)
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", PostRoutes);



// Server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on ${process.env.PORT
		}`);
})