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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await createUser(email, password);
			navigate("/dashboard");
		} catch (e) {
			setError(e.message);
			console.log(error);
		}
	};

	return (
		<div className="signUp">
			<div className="signUp-container">
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
				<button className="signUp-btn" onClick={handleSubmit}>
					Register
				</button>
				{/* <button className="signUp-btn signUp-google" onClick={signInWithGoogle}>
					Register with Google
				</button> */}
				<div>
					Already have an account? <Link to="/">Login</Link> now.
				</div>
			</div>
		</div>
	);
}
export default SignUp;
