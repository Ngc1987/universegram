import React, { useEffect, useState, useRef } from 'react';
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

		window.addEventListener("scroll", loadMore, { passive: true });
		return () => window.removeEventListener("scroll", loadMore, { passive: true })
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadPosts]);

	
	const loadMore = () => {
		// console.log(window.innerHeight, document.documentElement.scrollTop, document.scrollingElement.scrollHeight)
		if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
			setLoadPosts(true);
			// setCount(count + 5);
			// dispatch(getPosts(count));
		}
	}

	// Making a refs array
	const revealRefs = useRef([]);
	revealRefs.current = [];

	// Adding each ref on the refs array
	const pathRef = (el) => {
		if (el && !revealRefs.current.includes(el)) {
			revealRefs.current.push(el);
		}
	};


	const glow = (e) => {

		revealRefs.current.forEach((el) => {
			// console.log(el.style)
			// const rect = el.getBoundingClientRect();
	
			// el.style.setProperty("--x", e.clientX - rect.left);
			// el.style.setProperty("--y", e.clientY - rect.top);

		})
	}

	// console.log(revealRefs.current, revealRefs)

	return (
		<div className="thread-container features" onPointerMove={(e) => glow(e)} >
			
				{!isEmpty(posts[0]) &&
				posts.map((post) => {
					return (
						<Card innerRef={pathRef} post={post} key={post._id} page="home" className="feature"/>
					)
				})}
			
		</div>
	)
}

export default Thread