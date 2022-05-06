import React from 'react';
import Log from "../components/Log/Log";

const Login = () => {
	return (
		<section className="login">
			<Log signin={true} signup={false} />
		</section>
	)
}

export default Login;