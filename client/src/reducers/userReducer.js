
import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, UPDATE_PLANET, UPDATE_GALAXY, FOLLOW_USER, UNFOLLOW_USER, ADD_MESSAGE } from '../actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
	switch(action.type) {
		case GET_USER:
			return action.payload

		case UPLOAD_PICTURE:
			return {
				...state,
				picture: action.payload
			}

		case UPDATE_BIO:
			return {
				...state,
				bio: action.payload
			}

		case UPDATE_PLANET:
			return {
				...state,
				planet: action.payload
			}

		case UPDATE_GALAXY:
			return {
				...state,
				galaxy: action.payload
			}

		case FOLLOW_USER:
			return {
				...state,
				following: [action.payload.idToFollow, ...state.following],
			}

		case UNFOLLOW_USER:
			return {
				...state,
				following: state.following.filter(
					(id) => id !== action.payload.idToUnfollow
				),
			}
		
		case ADD_MESSAGE:
			return {
				...state,
				messages: [action.payload, ...state.messages],
			}

		default:
			return state;
	}
}
