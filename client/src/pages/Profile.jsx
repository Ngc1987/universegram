import React, { useContext } from 'react';
import Log from "../components/Log/Log";
import { UidContext } from "../components/AppContext";

const Profile = () => {

	const uid = useContext(UidContext);
	return (
		<div className="profil-page">
		{uid ? 
			<h1>Update page</h1>
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

export default Profile;