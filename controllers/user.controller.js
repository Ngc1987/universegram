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


module.exports.updateUser =  (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	try {
		 UserModel.findOneAndUpdate(
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



module.exports.unfollow2 = async (req, res) => {
	if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
		return res.status(400).send("Invalid id: " + req.params.id);

	try {
		// Add to following listen
		await UserModel.findByIdAndUpdate(
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

module.exports.follow = async (req, res, next) => {
	if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
		return res.status(400).send("Invalid id: " + req.params.id);

	// console.log(req.params.id, req.body.idToFollow)

	await UserModel.findById(req.params.id)
		.then((user) => {

			if (user.following.includes(req.body.idToFollow)) {
				return res.status(400).json({ message: "Already following" })
			}
			user.following.unshift(req.body.idToFollow);
			user.save();

			UserModel.findOne({ _id: req.body.idToFollow })
				.then((user) => {
					user.followers.unshift(req.params.id);
					user.save().then((user) => res.json(user))
				})
				.catch((err) => console.log(err))
		})
		.catch((err) => console.log(err))
}
module.exports.unfollow = async (req, res, next) => {
	if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
		return res.status(400).send("Invalid id: " + req.params.id);


	try {
		
		const query = {
			_id: req.params.id
		}
	
		const update = {
			$pull:{following: req.body.idToUnfollow}
		}
	
		const updated = UserModel.updateOne(query, update, {
			 new: true, upsert: true 
		}, function(err, obj) {
			console.log(err)
		})
	
		const secondQuery = {
			_id: req.body.idToUnfollow
		}
	
		const secondUpdate = {
			$pull: {followers:  req.params.id}
		}
	
		UserModel.updateOne(secondQuery, secondUpdate, {
			 new: true, upsert: true 
		}, function(err, obj) {
			res.status(200).json({message: "Unfollow ok"})
		})
	}
	catch (err) {
		res.status(400).json({ error: err.message })
	}
	// console.log(req.params.id, req.body.idToFollow)

	// UserModel.findById(req.params.id)
	// 	.then((user) => {

	// 		// if(user.following.includes(req.body.idToFollow)){
	// 		// 	return res.status(400).json({ message: "Already following" })
	// 		// }
			
	// 		user.following.filter((followed) => followed._id !== req.body.idToUnfollow)
	// 		// user.following.unshift(req.body.idToFollow);
	// 		user.save();

	// 		UserModel.findOne({ _id: req.body.idToUnfollow })
	// 			.then((user) => {
	// 				user.followers.filter((follower) => follower._id !== req.params.id)
	// 				user.save().then((user) => res.json(user))
	// 			})
	// 			.catch((err) => console.log(err))
	// 	})
	// 	.catch((err) => console.log(err))
}


