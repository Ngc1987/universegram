import React, {useEffect, useState} from "react";
import Routes from "././components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {

	const [uid, setUid] = useState(null);

	const dispatch = useDispatch();

	useEffect(()=> {
		async function fetchUserToken() {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/jwtid`,
				withCredentials: true
			})
			.then((res) => {
				console.log(res)
				setUid(res.data);
			})
			.catch((err) => {
				console.log("No token")
			})

		}
		fetchUserToken();

		if(uid) dispatch(getUser(uid));
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid])

	
	return (
		<UidContext.Provider value={uid} >
			<Routes/>
		</UidContext.Provider>
	);
}

export default App;
