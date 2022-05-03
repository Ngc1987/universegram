// import express from ("express");
// import bodyParser from ("body-parser");
// import cookieParser from "cookie-parser";
// import userRoutes from ("./routes/user.routes");
// import postRoutes from ("./routes/post.routes");
// import checkUser from "./middleware/checkUser";
// import requireAuth from "./middleware/requireAuth";
// import("dotenv").config({ path: "./config/.env" });
// import("./config/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const PostRoutes = require("./routes/post.routes");
const checkUser = require("./middleware/checkUser");
const requireAuth = require("./middleware/requireAuth");
require("dotenv").config({ path: "./config/.env" });
require("./config/db.js");
const cors = require("cors");
const path = require("path");

const app = express();

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	"allowedHeaders": ["sessionId", "Content-Type"],
	"exposedHeaders": ["sessionId"],
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false
}

app.use(cors(corsOptions));
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

// Server static assets if in production
if(process.env.NODE_ENV === "production"){
	// Set static folder
	app.use(express.static("client/build"))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})

}

// Server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on ${process.env.PORT
		}`);
})