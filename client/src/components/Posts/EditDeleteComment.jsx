import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { UidContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from "../../actions/post.actions";

const EditDeleteComment = ({comment, postId}) => {

	const [isAuthor, setIsAuthor] = useState(false);
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");

	const dispatch = useDispatch();

	const {uid} = useContext(UidContext);

	const handleEdit = (e) => {
		e.preventDefault();

		if(text){
			dispatch(editComment(postId, comment._id, text));
			setText("")
			setEdit(false);
		}
	}

	const handleDelete = () => {
		dispatch(deleteComment(postId, comment._id))
	}

	useEffect(() => {
		const checkAuthor = () => {
			if(uid === comment.commenterId) {
				setIsAuthor(true);
			}
		}
		checkAuthor();
	}, [uid, comment.commenterId])


	return (
		<div className="edit-comment">
			{isAuthor && !edit &&
				<span onClick={() => setEdit(!edit)} >
					<img src={process.env.PUBLIC_URL + "/img/icons/edit.svg"} alt="edit-comment" />
				</span>
			}
			{isAuthor && edit && 
				<form action="" onSubmit={handleEdit} className="edit-comment-form" >
					<br />
					<input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
					<br />
					<div className="btn">
					<label htmlFor="text" onClick={() => setEdit(!edit)}>Annuler</label>
						<span onClick={() => {
							if(window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
								handleDelete();
							}
						}} >
							<img src={process.env.PUBLIC_URL + "/img/icons/trash.svg"} alt="Supprimer commentaire" />
						</span>
						<input type="submit" value="Valider modifications" />
					</div>
				</form>
			}
		</div>
	)
}

export default EditDeleteComment