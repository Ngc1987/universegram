import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from "../actions/post.actions";
import { useSelector } from 'react-redux';
import { isEmpty } from '../utils/isEmpty';
import Card from './Posts/Card';

const Thread = () => {

	const [loadPosts, setLoadPosts] = useState(true);
	const dispatch = useDispatch();

	const [count, setCount] = useState(5);

	const posts = useSelector((state) => state.postReducer);

	useEffect(() => {
		if(loadPosts) {
			dispatch(getPosts(count));
			setLoadPosts(false);
			setCount(count + 5)
		}

		window.addEventListener("scroll", loadMore);
		return () => window.removeEventListener("scroll", loadMore)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadPosts]);

	
	const loadMore = () => {
		console.log(window.innerHeight, document.documentElement.scrollTop, document.scrollingElement.scrollHeight)
		if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
			setLoadPosts(true);
			// setCount(count + 5);
			// dispatch(getPosts(count));
		}
	}


	return (
		<div className="thread-container">
			
				{!isEmpty(posts[0]) &&
				posts.map((post) => {
					return (
						<Card post={post} key={post._id} />
					)
				})}
			
		</div>
	)
}

export default Thread