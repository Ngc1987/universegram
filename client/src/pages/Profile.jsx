import React, { useContext } from 'react';
import Log from "../components/Log/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfile from '../components/Profile/UpdateProfile';


/**
 * @component
 * @description It's the Profile page
 */
const Profile = () => {


	const uid = useContext(UidContext);
	return (
		<div className="profil-page">
		{uid ? 
			<UpdateProfile/>
			:

			<div className="log-container">
				<Log signin={false} signup={true}/>
				<div className="img-container">
					<img src="./img/log.svg" alt="img-log" />
				</div>
			</div>
		}
		</div>
	)
}

Profile.propTypes = {

}

export default Profile;