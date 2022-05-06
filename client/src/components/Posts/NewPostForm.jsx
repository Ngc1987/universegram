import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { addPosts, getPosts } from "../../actions/post.actions";
import { isEmpty } from '../../utils/isEmpty';
import { timestampParser } from "../../utils/timestampParser";

const NewPostForm = ({ userData}) => {

	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [postPicture, setPostPicture] = useState(null);
	const [video, setVideo] = useState("");
	const [file, setFile] = useState(null);

	// const userData = useSelector((state) => state.userReducer);
	const errors = useSelector((state) => state.errorsReducer.postErrors);

	const dispatch = useDispatch();

	console.log(isLoading, userData)

	useEffect(() => {
		if (!isEmpty(userData)) {
			setIsLoading(false);
		}
		const handleVideo = () => {
			let findVideo = message.split(" ");
			for(let i = 0; i < findVideo.length; i++) {
				if (findVideo[i].includes("https://www.yout") || 
					findVideo[i].includes("https://yout")
				) {
					let embed = findVideo[i].replace("watch?v=", "embed/");
					setVideo(embed.split("&")[0]);
					findVideo.splice(i, 1);
					setMessage(findVideo.join(" "));
					setPostPicture("");
				}
			
			}
			
		}
		handleVideo();

	}, [userData, message, video])


	const handlePicture = (e) => {
		setPostPicture(URL.createObjectURL(e.target.files[0]))
		setFile(e.target.files[0]);
		setVideo("");
	}

	const handlePost = async () => {
		if(message || postPicture || video) {
			const data = new FormData();
			data.append("posterId", userData._id);
			data.append("message", message);
			if(file) data.append("file", file)
			data.append("video", video) 

			await dispatch(addPosts(data));
			dispatch(getPosts());
			cancelPost();
		}
		else {
			alert("Veuillez entrer un message avant de valider.");
		}
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
						{(message || postPicture || video.length > 20) &&
							<li className="card-container">
								<div className="card-left">
									<img src={userData.picture} alt={userData.pseudo} />
								</div>
								<div className="card-right">
									<div className="card-header">
										<div className="pseudo">
											<h3>{userData.pseudo}</h3>
										</div>
										<span>{timestampParser(Date.now())}</span>
									</div>
									<div className="content">
										<p>{message}</p>
										<img src={postPicture} alt="" />
										{video && 
											<iframe src={video} 
													frameborder="0"
													title="video du post"
													allow="fullscreen"
													 >
											</iframe>
										}
									</div>
								</div>
							</li>
						}
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
							{!isEmpty(errors.format) && <p>{errors.format}</p>}
							{!isEmpty(errors.maxSize) && <p>{errors.maxSize}</p>}
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