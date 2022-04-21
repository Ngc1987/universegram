import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePost } from "../../actions/post.actions";

const DeleteCard = ({postToDelete}) => {

	const dispatch = useDispatch();

	const deleteQuote = () => {
		dispatch(deletePost(postToDelete));
	}

	return (
		<div onClick={() => {
				if(window.confirm("Voulez-vous supprimer ce post ?")) {
					deleteQuote()
				}
		}} >
			<img src={process.env.PUBLIC_URL + "/img/icons/trash.svg"} alt="Supprimer post" />
		</div>
	)
}

export default DeleteCard;