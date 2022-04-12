const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
	const users = await UserModel.find().select("-password");
	res.status(200).json(users);
}


module.exports.userInfo = (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send("Invalid id: " + req.params.id);

	UserModel.findById(req.params.id, (err, docs) => {
		if (!err) res.send(docs);
		else console.log("ID unknown: " + err)
	}).select("-password")
}


module.exports.updateUser = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	try {
		await UserModel.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					bio: req.body.bio,
					galaxy: req.body.galaxy,
					dimension: req.body.dimension
				}
			}, { new: true, upsert: true, setDefaultOnInsert: true },
			(err, docs) => {
				if (!err) {
					return res.send(docs);
				}
				else if (err) {
					return res.status(500).json({ message: err })
				}
			}
		)
	}
	catch (err) {
		//Give an error "Cannot set headers after they are sent to the client"
		if (err) {
			// return res.status(500).json({ message: err })
			console.log(err)
		}

	}
}


module.exports.deleteUser = async (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send("Invalid id: " + req.params.id);

	try {
		await UserModel.remove({ _id: req.params.id }).exec();
		res.status(200).json({ message: "Successfully deleted." })
	}
	catch (err) {
		return res.status(500).json({ message: err })
		console.log(err)
	}
}


module.exports.follow = (req, res) => {
	if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
		return res.status(400).send("Invalid id: " + req.params.id);

	console.log(req.params.id, req.body.idToFollow)

	try {
		// Add to the followers listen
		UserModel.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { following: req.body.idToFollow } },
			{ new: true, upsert: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs)
				else return res.status(400).json(err)
			}
		)
		// Add to following listen
		UserModel.findByIdAndUpdate(
			req.body.idToFollow,
			{ $addToSet: { followers: req.params.id } },
			{ new: true, upsert: true },
			(err, docs) => {
				//Unable to make return two responses, we can tink if the first don't throw error, the second also
				// if(!err) res.status(201).json(docs)
				if (err) return res.status(400).json(err)
			}
		)
	}
	catch (err) {
		//Give an error "Cannot set headers after they are sent to the client"
		return res.status(500).json({ message: err })
		console.log(err)
	}
}
module.exports.unfollow = (req, res) => {
	if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
		return res.status(400).send("Invalid id: " + req.params.id);

	try {
		// Add to the followers listen
		UserModel.findByIdAndUpdate(
			req.params.id,
			{ $pull: { following: req.body.idToUnfollow } },
			{ new: true, upsert: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs)
				else return res.status(400).json(err)
			}
		)
		// Add to following listen
		UserModel.findByIdAndUpdate(
			req.body.idToUnfollow,
			{ $pull: { followers: req.params.id } },
			{ new: true, upsert: true },
			(err, docs) => {
				//Unable to make return two responses, we can tink if the first don't throw error, the second also
				// if(!err) res.status(201).json(docs)
				if (err) return res.status(400).json(err)
			}
		)
	}
	catch (err) {
		//Give an error "Cannot set headers after they are sent to the client"
		// return res.status(500).json({ message: err })
		console.log(err)
	}
}


