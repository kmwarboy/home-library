import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from "../firebase";
import "./SignUp.scss";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [user, loading] = useAuthState(auth);
	// const history = useHistory();
	const register = () => {
		if (!name) alert("Please enter name");
		registerWithEmailAndPassword(name, email, password);
	};
	useEffect(() => {
		if (loading) return;
		if (user) window.location.href = "/dashboard";
	}, [user, loading]);
	return (
		<div className="signUp">
			<div className="signUp-container">
				<input
					type="text"
					className="signUp-input"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full Name"
				/>
				<input
					type="text"
					className="signUp-input"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="signUp-input"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button className="signUp-btn" onClick={register}>
					Register
				</button>
				<button className="signUp-btn signUp-google" onClick={signInWithGoogle}>
					Register with Google
				</button>
				<div>
					Already have an account? <Link to="/">Login</Link> now.
				</div>
			</div>
		</div>
	);
}
export default SignUp;
