import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils/isEmpty';
import { dateParser } from '../../utils/dateParser';
import FollowHandler from "../Profile/FollowHandler";
import LikeButton from "./LikeButton";
import { useDispatch } from 'react-redux';
import { getPosts, updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComment from './CardComment';

const Card = ({ post }) => {

	// Fetch the necessary redux states
	const usersData = useSelector((state) => state.usersReducer);
	const userData = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();
	// State to know if the post is loaded
	const [isLoading, setIsloading] = useState(true);

	// Update post
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);

	// Show or no the post comments
	const [showComments, setShowComments] = useState(false);

	useEffect(() => {
		!isEmpty(usersData[0]) && setIsloading(false);
	}, [usersData])

	const updateItem = () => {
		if (textUpdate) {
			dispatch(updatePost(post._id, textUpdate));
		}
		setIsUpdated(false);
	}

	return (
		<article className="card-container" key={post._id} >
			{isLoading ?
				<i className="fas fa-spinner fa-spin" ></i>
				:
				<>
					<div className="card-left">
						<img src={
							!isEmpty(usersData[0]) &&
							usersData.map((user) => {
								if (user._id === post.posterId) {
									return user.picture
								} else {
									return null;
								}

							})
								.join("")}
							alt={usersData.map((user) => {
								if (user._id === post.posterId) {
									return `${user.pseudo}-pic`
								} else {
									return null
								}

							})} />
					</div>
					<div className="card-right">
						<div className="card-header">
							<div className="pseudo">
								<h3>
									{!isEmpty(usersData[0]) &&
										usersData.map((user) => {
											if (user._id === post.posterId) {
												return user.pseudo
											} else {
												return null
											}

										}).join("")
									}
								</h3>
								{post.posterId !== userData._id && <FollowHandler idToFollowOrUnfollow={post.posterId} type="card" />}

							</div>
							<span>{dateParser(post.createdAt)}</span>
						</div>
						{!isUpdated ? <p>{post.message}</p> :
							<div className="update-post">
								<textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
								<div className="button-container">
									<button className="btn" onClick={updateItem} >Valider modifications</button>
								</div>
							</div>
						}
						{/* <p>{post.message}</p> */}
						{post.picture && <img src={post.picture} alt="post-pic" className="card-pic" />}
						{post.video && <iframe width={500} height={300} src={post.video} frameBorder="0" allow="fullscreen" title={post._id} ></iframe>}
						{userData._id === post.posterId &&
							<div className="button-container">
								<div onClick={() => setIsUpdated(!isUpdated)} >
									<img src={process.env.PUBLIC_URL + "/img/icons/edit.svg"} alt="" />
								</div>
								<DeleteCard postToDelete={post._id} />
							</div>
						}

						<div className="card-footer">
							<div className="comment-icon">
								<img onClick={() => setShowComments(!showComments)} src={process.env.PUBLIC_URL + "/img/icons/message1.svg"} alt="commentaire" />
								<span>{post.comments.length}</span>
							</div>
							<LikeButton post={post} />
							<img src={process.env.PUBLIC_URL + "/img/icons/share.svg"} alt="Partager" />
						</div>
						{showComments &&
							<CardComment post={post} />
						}
					</div>
				</>
			}
		</article>
	)
}

export default Card;