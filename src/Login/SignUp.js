import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./SignUp.scss";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { createUser } = UserAuth();
	const navigate = useNavigate();
	const { googleSignIn } = UserAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		try {
			await createUser(email, password).then(navigate("/dashboard"));
		} catch (event) {
			setError(event.message);
			alert(error);
		}
	};

	const handleGoogleSubmit = async (event) => {
		event.preventDefault();
		try {
			await googleSignIn().then(navigate("/dashboard"));
		} catch (event) {
			setError(event.message);
			alert(error);
		}
	};

	return (
		<div className="signUp">
			<div className="signUp-container">
				<input
					type="text"
					className="signUp-input"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="signUp-input"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="Password"
				/>
				<button className="signUp-btn" onClick={handleSubmit}>
					Register
				</button>
				<button
					className="signUp-btn signUp-google"
					onClick={handleGoogleSubmit}
				>
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
