import React, { useContext } from 'react';
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Posts/NewPostForm";
import Thread from "../components/Thread";
import Log from '../components/Log/Log';
import Trends from '../components/Trends';
import FriendsHint from '../components/Profile/FriendsHint';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


/**
 * @component
 * @description It's the Home page
 */
const Home = () => {

	const {uid} = useContext(UidContext);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.userReducer);

	if(!uid) navigate("/")
	return (
		<section className="home" >
			{/* <LeftNav/> */}
			<div className="main">
				<div className="home-header">
					<NewPostForm userData={userData}/>
				</div>
				<Thread />
			</div>
			{/* <div className="right-side"> */}
				<div className="right-side-container">
					{/* <div className="wrapper"> */}
					<Trends />
					{uid && <FriendsHint />}
					{/* </div> */}
				</div>
			{/* </div> */}
		</section>
	)
}

Home.propTypes = {

}

export default Home;