const mongoose = require("mongoose");
// import mongoose from ("mongoose")

mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.amalb.mongodb.net/universegram")
	.then(() => console.log(`Connected to MongoDB`))
	.catch((err) => console.log(`Failed to connect to MongoDB. Error: ${err}`));
