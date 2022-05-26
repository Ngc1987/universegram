import React, { useContext, useState, useEffect } from 'react';
import Log from "../components/Log/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfile from '../components/Profile/UpdateProfile';
import Card from './../components/Posts/Card';
import { useSelector } from 'react-redux';
import LeftNav from "../components/LeftNav";
import { useParams } from 'react-router-dom';
import { isEmpty } from "../utils/isEmpty";

/**
 * @component
 * @description It's the Profile page
 */
const Profile = () => {
	
	const posts = useSelector((state) => state.postReducer);
	const {uid} = useContext(UidContext);

	
	const [userId, setUserId] = useState(null);
	
	const {id} = useParams();

	// const userId = uid2.id

	console.log(posts, uid)

	return (
		<div className="profil-page">
			{/* <LeftNav/> */}
			<>
				<UpdateProfile/>
				{!isEmpty(posts[0]) && posts.map((post) => {
					if (post.posterId === id) {
						return (
							<Card post={post} key={post._id} page="profil"/>
						)
					} return null
				})}
			</>
		</div>
	)
}

Profile.propTypes = {

}

export default Profile;