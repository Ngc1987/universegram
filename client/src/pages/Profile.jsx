import React, { useContext, useState, useEffect } from 'react';
import Log from "../components/Log/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfile from '../components/Profile/UpdateProfile';
import Card from './../components/Posts/Card';
import { useSelector } from 'react-redux';
import LeftNav from "../components/LeftNav";
import { useParams } from 'react-router-dom';

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


	return (
		<div className="profil-page">
			{/* <LeftNav/> */}
		{uid ? 
			<>
				<UpdateProfile/>
				{posts.map((post) => {
					if (post.posterId === id) {
						return (
							<Card post={post} key={post._id} page="profil"/>
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