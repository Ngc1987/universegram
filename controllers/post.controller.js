const { default: mongoose } = require("mongoose");
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
	PostModel.find((err, docs) => {
		if (!err) res.send(docs);
		else console.log("Error to get data: " + err)
	}).sort({ createdAt: -1 })
}

module.exports.createPost = async (req, res) => {
	const newPost = new PostModel({
		posterId: req.body.posterId,
		message: req.body.message,
		// picture: req.body.picture,
		video: req.body.video,
		likers: [],
		comments: []
	});
	try {
		const post = await newPost.save();
		return res.status(201).json(post);
	}
	catch (err) {
		return res.status(400).send(err)
	}
}

module.exports.updatePost = (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	const updatedRecord = {
		message: req.body.message
	}

	PostModel.findByIdAndUpdate(
		req.params.id,
		{ $set: updatedRecord },
		{ new: true },
		(err, docs) => {
			if (!err) res.send(docs);
			else console.log("Error to update data: " + err)
		}

	)

}

module.exports.deletePost = (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	PostModel.findByIdAndRemove(
		req.params.id,
		(err, docs) => {
			if (!err) res.send({ message: "Post deleted successly." });
			else console.log("Delete error: " + err)
		}
	)
}

module.exports.likePost = (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	try {
		PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$addToSet: { likers: req.body.id }
			},
			{ new: true },
			(err, docs) => {
				if (err) return res.status(400).send(err)
			}
		)

		UserModel.findByIdAndUpdate(
			req.body.id,
			{
				$addToSet: { likes: req.params.id }
			},
			{ new: true },
			(err, docs) => {
				if (!err) res.send(docs)
				else return res.status(400).send(err)
			}
		)
	}
	catch (err) {
		return res.status(400).send(err)
	}
}

module.exports.unlikePost = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	try {
		PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$pull: { likers: req.body.id }
			},
			{ new: true },
			(err, docs) => {
				if (err) return res.status(400).send(err)
			}
		)

		UserModel.findByIdAndUpdate(
			req.body.id,
			{
				$pull: { likes: req.params.id }
			},
			{ new: true },
			(err, docs) => {
				if (!err) res.send(docs)
				else return res.status(400).send(err)
			}
		)
	}
	catch (err) {
		return res.status(400).send(err)
	}
}

module.exports.commentPost = (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	try {
		return PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$push: {
					comments: {
						commenterId: req.body.commenterId,
						commenterPseudo: req.body.commenterPseudo,
						text: req.body.text,
						timestamp: new Date().getTime()
					}
				}
			},
			{ new: true },
			(err, docs) => {
				if (!err) return res.send(docs)
				else return res.status(400).send(err);
			}
		)
	}
	catch (err) {
		return res.status(400).send(err)
	}
}

module.exports.editCommentPost = (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	try {

		PostModel.findOneAndUpdate(
			{ "_id": req.params.id, "comments._id": req.body.commentId },
			{
				"$set": { "comments.$.text": req.body.text }
			},
			function (err, docs) {
				if (err) return res.status(400).send(err);
				else return res.send(docs);
			}
		)
	}
	catch (err) {
		return res.status(400).send(err)
	}
}

module.exports.deleteCommentPost = (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("Invalid id: " + req.params.id);
	}

	try {
		return PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$pull: {
					comments: {
						_id: req.body.commentId
					}
				}
			},
			{new: true},
			(err, docs) => {
				if(!err) return res.send(docs);
				else return res.status(400).send(err)
			}
		)
	}
	catch(err) {
		return res.statur(400).send(err)
	}
}