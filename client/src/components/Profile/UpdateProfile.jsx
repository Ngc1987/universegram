import React, { useState, useEffect } from 'react'
// import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from 'react-redux';
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../../utils/dateParser";
import FollowHandler from "./FollowHandler";
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UidContext } from './../AppContext';
import { getUser } from './../../actions/user.actions';

const UpdateProfile = () => {

	const { id } = useParams();
	const { uid } = useContext(UidContext)

	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const errors = useSelector((state) => state.errorsReducer.userErrors);


	const [bio, setBio] = useState(null);
	const [planet, setPlanet] = useState(null);
	const [galaxy, setGalaxy] = useState(null);
	const [updateBioForm, setUpdateBioForm] = useState(false);
	const [updatePlanetForm, setUpdatePlanetForm] = useState(false);
	const [updateGalaxyForm, setUpdateGalaxyForm] = useState(false);

	const [followingPopup, setFollowingPopup] = useState(false);
	const [followersPopup, setFollowersPopup] = useState(false);


	const handleUpdateBio = () => {
		dispatch(updateBio(userData._id, bio))
		setUpdateBioForm(false);
	}
	const handleUpdatePlanet = () => {
		// dispatch(updatePlanet(userData._id, planet))
		setUpdatePlanetForm(false);
	}
	const handleUpdateGalaxy = () => {
		// dispatch(updateGalaxy(userData._id, galaxy))
		setUpdateGalaxyForm(false);
	}


	console.log(userData.bio)
	// console.log(dateParser("2022-05-09T11:23:52.094Z"))
	// console.log(dateParser("2020-10-09T19:47:04.168Z"))

	return (
		<div className="profil-container">

			{usersData.map((user) => {
				if (user._id === id) {
					return (
						<div className="profil-container-child" key={user._id} >

							{/* <LeftNav/> */}
							<h1>Profil de {user.pseudo}</h1>
							<h4>Membre depuis le {user.createdAt ? dateParser(user.createdAt) : user.date && dateParser(user.date)}</h4>
							<div className="update-container">
								<div className="left-part">
									<h3>Photo de profil</h3>
									<img src={user.picture.slice(1)} alt="Profil de l'utilisateur" />
									<UploadImg />
									<p>{errors.maxSize}</p>
									<p>{errors.format}</p>
								</div>

								<div className="right-part">
									<div className="bio-update">
										<h3>Bio</h3>
										{updateBioForm === false && uid === user._id && (
											<>
												<p onClick={() => setUpdateBioForm(!updateBioForm)}>{userData.bio}</p>
												{uid === user._id &&
													<button onClick={() => setUpdateBioForm(!updateBioForm)}>Modifier bio</button>
												}
											</>
										)}
										{updateBioForm && uid === user._id && (
											<>
												<textarea
													type="text"
													defaultValue={userData.bio}
													onChange={(e) => setBio(e.target.value)}
												></textarea>

												<button onClick={handleUpdateBio}>Valider modifications</button>
											</>
										)}
										{uid !== user._id && <p>{user.bio}</p>}
									</div>
									<div className="planet-update">
										<h3>Planète</h3>
										{updatePlanetForm === false && uid === user._id && (
											<>
												<p onClick={() => setUpdatePlanetForm(!updatePlanetForm)}>{userData.planet}</p>
												{uid === user._id &&
													<button onClick={() => setUpdatePlanetForm(!updatePlanetForm)}>
														Modifier planète
													</button>
												}
											</>
										)}
										{updatePlanetForm && uid === user._id && (
											<>
												<textarea
													type="text"
													defaultValue={userData.planet}
													onChange={(e) => setBio(e.target.value)}
												></textarea>

												<button onClick={handleUpdatePlanet}>Valider modifications</button>
											</>
										)}
										{uid !== user._id && <p>{user.planet}</p>}
									</div>
									
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
											{
												usersData.map((otherUser) => {

													for (let i = 0; i < user.following.length; i++) {
														if (otherUser._id === user.following[i]) {
															return (
																<li className="popup-ul-li" key={otherUser._id} >
																	<img src={otherUser.picture.slice(1)} alt={`${otherUser.pseudo}-pic`} />
																	<h4>{otherUser.pseudo}</h4>
																	<div className="follow-handler">
																		<FollowHandler idToFollowOrUnfollow={otherUser._id} type="suggestion" />
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
											{usersData.map((otherUser) => {

												for (let i = 0; i < user.followers.length; i++) {
													if (otherUser._id === user.followers[i]) {
														return (
															<li className="popup-ul-li" key={otherUser._id} >
																<img src={otherUser.picture.slice(1)} alt={`${otherUser.pseudo}-pic`} />
																<h4>{otherUser.pseudo}</h4>
																<div className="follow-handler">
																	<FollowHandler idToFollowOrUnfollow={otherUser._id} type="suggestion" />
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
				return null
			})}

		</div>
	)
}

export default UpdateProfile;