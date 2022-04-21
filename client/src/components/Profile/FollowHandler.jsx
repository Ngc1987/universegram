import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils/isEmpty';
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from "../../actions/user.actions";

const FollowHandler = ({idToFollowOrUnfollow, type}) => {

	const userData = useSelector((state) => state.userReducer);
	const [isFollowed, setIsFollowed] = useState(false);
	const dispatch = useDispatch();

	const handleFollow = () => {
		dispatch(followUser(userData._id, idToFollowOrUnfollow));
		setIsFollowed(true);
	};

	const handleUnfollow = () => {
		dispatch(unfollowUser(userData._id, idToFollowOrUnfollow));
		setIsFollowed(false);
	};

	useEffect(() => {
		if (!isEmpty(userData.following)) {
			if (userData.following.includes(idToFollowOrUnfollow)) {
				setIsFollowed(true);
			} else setIsFollowed(false);
		}
	}, [userData, idToFollowOrUnfollow]);

	return (
		<>
			{isFollowed && !isEmpty(userData) &&
				<span onClick={handleUnfollow} >
					{type === "suggestion" ? <button className="unfollow-btn" >Abonné</button>
						:
						<img src={process.env.PUBLIC_URL + "/img/icons/checked.svg"} alt="checked" />
					}
					
				</span>
			}
			{!isFollowed && !isEmpty(userData) &&
				<span onClick={handleFollow} >
					{type === "suggestion" ? <button className="follow-btn" >Suivre</button>
						:
						<img src={process.env.PUBLIC_URL + "/img/icons/check.svg"} alt="check" />
					}
				</span>
			}
		</>
	)
}

export default FollowHandler;