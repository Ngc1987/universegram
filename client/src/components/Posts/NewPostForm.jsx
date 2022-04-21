import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { isEmpty } from '../../utils/isEmpty';

const NewPostForm = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [postPicture, setPostPicture] = useState(null);
	const [video, setVideo] = useState("");
	const [file, setFile] = useState(null);

	const userData = useSelector((state) => state.userReducer);

	useEffect(() => {
		if (!isEmpty(userData)) {
			setIsLoading(false);
		}
	}, [userData])

	const handlePicture = () => {

	}

	const handlePost = () => {

	}

	const cancelPost = () => {
		setMessage("");
		setPostPicture("");
		setVideo("");
		setFile("");
	}

	return (
		<div className="post-container">
			{isLoading ?
				<i className="fas fa-spinner fa-pulse" ></i>
				:
				<>
					<div className="data">
						<p><span>{userData.following ? userData.following.length : 0}</span>{" "}Abonnement{userData.following && userData.following.length > 1 && "s"}</p>
						<p><span>{userData.followers ? userData.followers.length : 0}</span>{" "}Abonné{userData.followers && userData.followers.length > 1 && "s"}</p>
					</div>
					<div className="user-info">
						<NavLink to="/profil" >
							<img src={userData.picture} alt={userData.pseudo} />
						</NavLink>
					</div>
					<div className="post-form">
						<textarea name="message" 
								id="message" 
								placeholder="Quoi de neuf ?" 
								onChange={(e) => setMessage(e.target.value)} 
								value={message} >
						</textarea>
						<div className="footer-form">
							<div className="icon">
								{isEmpty(video) &&
									<>
										<img src={process.env.PUBLIC_URL + "/img/icons/picture.svg"} alt="Ajouterimage " />
										<input type="file" 
												id="file-upload" 
												name="file" 
												accept=".jpg, .jpeg, .png" 
												onChange={(e) => handlePicture(e)} 
										/>
									</>
								}
								{video && 
									<button onClick={() => setVideo("")} >Supprimer vidéo</button>
								}
							</div>
							<div className="btn-send">
								{(message || file || postPicture || video.length > 20) &&
									<button cl	assName="cancel" onClick={cancelPost}>Annuler message</button>
								
								}
								<button className="send" onClick={handlePost} >Envoyer</button>
							</div>
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default NewPostForm;