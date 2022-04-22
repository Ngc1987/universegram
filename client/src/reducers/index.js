import {combineReducers} from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postReducer from "./postReducer";
import errorsReducer from "./errorsReducer";
import allPostsReducer from "./allPostsReducer";
import trendingsReducer from "./trendingsReducer"

export default combineReducers({
	userReducer,
	usersReducer,
	postReducer,
	errorsReducer,
	allPostsReducer,
	trendingsReducer
})