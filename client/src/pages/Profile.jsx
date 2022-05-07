import React, { useContext, useState, useEffect } from 'react';
import Log from "../components/Log/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfile from '../components/Profile/UpdateProfile';
import Card from './../components/Posts/Card';
import { useSelector } from 'react-redux';


/**
 * @component
 * @description It's the Profile page
 */
const Profile = () => {
	
	const posts = useSelector((state) => state.postReducer);
	const uid = useContext(UidContext);

	return (
		<div className="profil-page">
		{uid ? 
		<>
			<UpdateProfile/>
			{posts.map((post) => {
				if(post.posterId === uid) {
					return (
						<Card post={post} key={post._id} />
					)
				} return null
			})}
		</>
			:

			<div className="log-container">
				<Log signin={false} signup={true}/>
				<div className="img-container">
					<img src="./img/log.svg" alt="img-log" />
				</div>
			</div>
		}
		</div>
	)
}

Profile.propTypes = {

}

export default Profile;