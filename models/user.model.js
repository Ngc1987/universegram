const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

function validEmail(email) {
	if(!isEmail(email)) {
		return false;
	}
	else {
		return true
	}
}

const userSchema = new mongoose.Schema(
	{
		pseudo: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 20,
			unique: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			unique: true,
			validate: validEmail
		},
		password: {
			type: String,
			required: true,
			maxLength: 1024,
			minLength: 6
		},
		dimension: {
			type: String,
		},
		galaxy: {
			type: String,
		},
		picture: {
			type: String,
			default: "./uploads/profil/random-user.png"
		},
		bio: {
			type: String,
			maxLength: 1024
		},
		followers: {
			type: [String],
		},
		following: {
			type: [String]
		},
		likes: {
			type: [String]
		}
	},
	{
		timestamps: true,
	}
)

// Play function before save into display: block
userSchema.pre("save", async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hashSync(this.password, salt);
	next();
})

userSchema.statics.login = async function(email, password) {
	const user = await this.findOne({email});
	if(user) {
		const auth = await bcrypt.compareSync(password, user.password);
		if(auth) {
			return user;
		}
		throw Error("Incorrect password");
	}
	throw Error("Incorrect email");
}

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;