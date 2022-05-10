import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from "../../actions/user.actions";
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UidContext } from './../AppContext';

const UploadImg = () => {

	const { id } = useParams();
	const {uid} = useContext(UidContext)

	const [file, setFile] = useState(null);

	const dispatch = useDispatch();

	const userData = useSelector((state) => state.userReducer);
	console.log(file)

	const handleLoadPicture = (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('name', userData.pseudo);
		data.append("userId", userData._id);
		data.append("file", file);

		dispatch(uploadPicture(data, userData._id))
	}
	return (
		<form action="" 
			  onSubmit={handleLoadPicture} 
			  className="upload-pic" >

			  {uid === id &&
			  <>
				<label htmlFor="file">Changer la photo de profil</label>

				<input type="file"
					id="file"
					name="file"
					accept=".jpg, .jpeg, .png"
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<br />
				<input type="submit" value="Envoyer" /> 
			  </>
			  }
		</form>
	)
}

export default UploadImg