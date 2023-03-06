import React, { useState, useEffect } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			return;
		}
		if (user) navigate("/dashboard");
	}, [user, loading, navigate]);

	return (
		<div className="login">
			<div className="login-container">
				<div className="login-header">
					<FontAwesomeIcon icon={faBookReader} />
					<h1>little home library</h1>
				</div>
				<div className="login-form">
					<form>
						<div className="login-field">
							<label htmlFor="username">username: </label>
							<input
								name="username"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="login-field">
							<label htmlFor="password">password: </label>
							<input
								name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							className="login-btn"
							onClick={() => logInWithEmailAndPassword(email, password)}
						>
							sign in
						</button>
						OR
						<button className="login-btn" onClick={signInWithGoogle}>
							sign in with google
						</button>
					</form>
				</div>
				<div className="login-signup">
					<p>
						new here? <Link to="/signup">sign up</Link>.
					</p>
				</div>
				<Link to="/dashboard">Dashboard</Link>
			</div>
		</div>
	);
};

export default Login;
