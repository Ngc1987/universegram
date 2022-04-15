// router.post("/user/:user_id/follow-user", passport.authenticate("jwt", { session: false }), (req, res) => {

// 	// check if the requested user and :user_id is same if same then 

// 	if (req.user.id === req.params.user_id) {
// 		return res.status(400).json({ alreadyfollow: "You cannot follow yourself" })
// 	}

// 	User.findById(req.params.user_id)
// 		.then(user => {

// 			// check if the requested user is already in follower list of other user then 

// 			if (user.followers.filter(follower =>
// 				follower.user.toString() === req.user.id).length > 0) {
// 				return res.status(400).json({ alreadyfollow: "You already followed the user" })
// 			}

// 			user.followers.unshift({ user: req.user.id });
// 			user.save()
// 			User.findOne({ email: req.user.email })
// 				.then(user => {
// 					user.following.unshift({ user: req.params.user_id });
// 					user.save().then(user => res.json(user))
// 				})
// 				.catch(err => res.status(404).json({ alradyfollow: "you already followed the user" }))
// 		})
// })












// try {

// 	// check if your id doesn't match the id of the user you want to unfollow
// 	if (user._id === current_id) {
// 		return res.status(400).json({ error: 'You cannot unfollow yourself' })
// 	}

// 	// remove the id of the user you want to unfollow from following array
// 	const query = {
// 		_id: current_id
// 	}

// 	const update = {
// 		$pull: { followings: { _id: user._id } }
// 	}

// 	const updated = User.updateOne(query, update, {
// 		safe: true
// 	}, function (err, obj) {
// 		console.log(err);
// 	})

// 	// remove your id from the followers array of the user you want to unfollow
// 	const secondQuery = {
// 		_id: user._id
// 	}

// 	const secondUpdate = {
// 		$pull: { followers: { _id: current_id } }
// 	}

// 	console.log(secondQuery)
// 	console.log(secondUpdate)

// 	User.updateOne(secondQuery, secondUpdate, {
// 		safe: true
// 	}, function (err, obj) {
// 		res.status(200).json({
// 			obj
// 		});
// 	})

// }
// catch (err) {
// 	res.status(400).json({ error: err.message })
// }