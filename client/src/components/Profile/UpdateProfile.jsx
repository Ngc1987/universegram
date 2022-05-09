import React, { useState } from 'react'
// import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from 'react-redux';
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../../utils/dateParser";
import FollowHandler from "./FollowHandler";
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UidContext } from './../AppContext';

const UpdateProfile = () => {

	const { id } = useParams();
	const uid = useContext(UidContext)

	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const errors = useSelector((state) => state.errorsReducer.userErrors);


	const [bio, setBio] = useState(null);
	const [updateForm, setUpdateForm] = useState(false);

	const [followingPopup, setFollowingPopup] = useState(false);
	const [followersPopup, setFollowersPopup] = useState(false);


	const handleUpdateBio = () => {
		dispatch(updateBio(userData._id, bio));
		setUpdateForm(false);
	}

	// console.log(usersData)
	// console.log(dateParser("2022-05-09T11:23:52.094Z"))
	// console.log(dateParser("2020-10-09T19:47:04.168Z"))

	return (
		<div className="profil-container">

		{usersData.map((user) => {
			if(user._id === id) {
				return(
					<div className="profil-container-child" key={user._id} >

					{/* <LeftNav/> */}
			<h1>Profil de {user.pseudo}</h1>
			<div className="update-container">
				<div className="left-part">
					<h3>Photo de profil</h3>
					<img src={user.picture.slice(1)} alt="Profil de l'utilisateur" />
					<UploadImg/>
					<p>{errors.maxSize}</p>
					<p>{errors.format}</p>
				</div>

				<div className="right-part">
					<div className="bio-update">
						<h3>Bio</h3>
						{updateForm === false && (
							<>
								<p onClick={() => setUpdateForm(!updateForm)}>{user.bio}</p>
									{uid === user._id && 	
										<button onClick={() => setUpdateForm(!updateForm)}>
											Modifier bio
										</button>
									}
							</>
						)}
						{updateForm && (
							<>
								<textarea
									type="text"
									defaultValue={user.bio}
									onChange={(e) => setBio(e.target.value)}
								></textarea>

								<button onClick={handleUpdateBio}>Valider modifications</button>
							</>
						)}
					</div>
								<h4>Membre depuis le {user.createdAt ? dateParser(user.createdAt) : user.date && dateParser(user.date)}</h4>
					<h5 onClick={() => setFollowingPopup(true)} >Abonnements: {user.following?.length}</h5>
					<h5 onClick={() => setFollowersPopup(true)} >Abonnés: {user.followers?.length}</h5>
				</div>
			</div>
			{
		followingPopup &&
		<div className="popup-profil-container">
			<div className="modal">
				<h3>Abonnements</h3>
				<span className="cross" onClick={() => setFollowingPopup(false)} >&#10005;</span>
				<ul className="popup-ul" >
					{usersData.map((user) => {

						for (let i = 0; i < user.following.length; i++) {
							if (user._id === user.following[i]) {
								return (
									<li className="popup-ul-li" key={user._id} >
										<img src={user.picture.slice(1)} alt={`${user.pseudo}-pic`} />
										<h4>{user.pseudo}</h4>
										<div className="follow-handler">
											<FollowHandler idToFollowOrUnfollow={user._id} type="suggestion" />
										</div>
									</li>
								)
							}
						}
						return null
					})}
				</ul>
			</div>
		</div>
	}
	{
		followersPopup &&
		<div className="popup-profil-container">
			<div className="modal">
				<h3>Abonnés</h3>
				<span className="cross" onClick={() => setFollowersPopup(false)} >&#10005;</span>
				<ul className="popup-ul" >
					{usersData.map((user) => {

						for (let i = 0; i < userData.followers.length; i++) {
							if (user._id === userData.followers[i]) {
								return (
									<li className="popup-ul-li" key={user._id} >
										<img src={user.picture} alt={`${user.pseudo}-pic`} />
										<h4>{user.pseudo}</h4>
										<div className="follow-handler">
											<FollowHandler idToFollowOrUnfollow={user._id} type="suggestion" />
										</div>
									</li>
								)
							}
						}
						return null
					})}
				</ul>
			</div>
		</div>
		
	}
					</div>
				)
			}
		})}
			
		</div>
	)
}

export default UpdateProfile;