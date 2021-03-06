import React, { useContext } from 'react';
import { UidContext } from "../components/AppContext";
import { useSelector } from 'react-redux';
import { isEmpty } from '../utils/isEmpty';
import Card from "../components/Posts/Card";
import Trends from "../components/Trends";
import LeftNav from "../components/LeftNav";

/**
 * @component
 * @description It's the Trending page
 */
const Trending = () => {

	const {uid} = useContext(UidContext);
	const trendList = useSelector((state) => state.trendingsReducer)

	return (
		<div className="trending-page">
			{/* <LeftNav /> */}
			<div className="main">
					{!isEmpty(trendList[0]) && trendList.map((post) => 

					<Card post={post} key={post._id} page="trending"/>)}
				
			</div>

			<div className="right-side">
				<div className="right-side-container">
					{/* <Trends /> */}
				</div>
			</div>
		</div>
	)
}

Trending.propTypes = {

}

export default Trending;