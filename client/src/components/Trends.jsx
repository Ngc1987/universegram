import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getTrends } from "../actions/post.actions";
import usersReducer from '../reducers/usersReducer';
import { isEmpty } from '../utils/isEmpty';
import trendingsReducer from '../reducers/trendingsReducer';

const Trends = () => {

	const posts = useSelector((state) => state.allPostsReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const trendList = useSelector((state) => state.trendingsReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		if(!isEmpty(posts[0])) {
			const postsArray = Object.keys(posts).map((i) => posts[i])
			
			let sortedArray = postsArray.sort((a, b) => {
				return b.likers.length - a.likers.length
			})
			// console.log(sortedArray)
			sortedArray.length = 3;
			dispatch(getTrends(sortedArray))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [posts])

	return (
		<div className="trending-container">
			<h4>Trending</h4>
			<NavLink to="/trending" >
				<ul>
					{trendList.length && 
						trendList.map((post) => {
							return (
								<li key={post._id} >
									<div>
										{post.picture && <img src={post.picture} alt={`post-pic`} />}
										{/* {post.video && <iframe width={500} height={300} src={post.video} frameBorder="0" allow="fullscreen" title={post._id} ></iframe>} */}
										{isEmpty(post.picture)  && <img src={usersData[0] && usersData.map((user) => {
											if(user._id === post.posterId) {
												return user.picture
											} else {
												return null
											}
										}).join("")} alt={`profil-pic`} />}
									</div>
									<div className="trend-content">
										<p>{post.message}</p>
										<span>Lire</span>
									</div>
								</li>
							)
						})
					}
				</ul>
			</NavLink>
		</div>
	)
}

export default Trends;