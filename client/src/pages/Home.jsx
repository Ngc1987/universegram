import React, {useContext} from 'react';
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Posts/NewPostForm";
import Thread from "../components/Thread";
import Log from '../components/Log/Log';


/**
 * @component
 * @description It's the Home page
 */
const Home = () => {

	const uid = useContext(UidContext);
	return (
		<section className="home" >
			{/* <LeftNav/> */}
			<div className="main">
				<div className="home-header">
					{uid ? <NewPostForm/> : <Log signin={true} signup={false} />}
				</div>
				<Thread/>
			</div>
		</section>
	)
}

Home.propTypes = {

}

export default Home;