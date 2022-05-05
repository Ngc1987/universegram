import React, {useEffect, useState} from "react";
import Routes from "././components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {

	const [uid, setUid] = useState(null);

	const userToken = useSelector((state) => state.userReducer.token);
	const dispatch = useDispatch();

	console.log(uid, userToken)

	useEffect(()=> {
		// async function fetchUserToken() {
		// 	await axios({
		// 		method: "get",
		// 		url: `${process.env.REACT_APP_API_URL}/jwtid`,
		// 		withCredentials: true
		// 	})
		// 	.then((res) => {
		// 		console.log(res)
		// 		setUid(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log("No token")
		// 	})

		// }
		// fetchUserToken();

		if(userToken) dispatch(getUser(userToken));
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userToken])

	
	return (
		<UidContext.Provider value={userToken} >
			<Routes/>
		</UidContext.Provider>
	);
}

export default App;
