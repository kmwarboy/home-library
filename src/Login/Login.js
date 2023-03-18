import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { googleSignIn, user, signIn } = UserAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signIn(email, password);
			navigate("/dashboard");
		} catch (e) {
			setError(e.message);
			alert(error);
		}
	};

	const handleGoogleSubmit = async (e) => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate("/dashboard");
		} catch (e) {
			setError(e.message);
			alert(e.message);
		}
	};

	useEffect(() => {
		if (user != null) {
			navigate("/dashboard");
		}
	}, [user]);

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
							<label htmlFor="email">email: </label>
							<input
								name="email"
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
						<button className="login-btn" onClick={handleSubmit}>
							sign in
						</button>
						<button className="login-btn" onClick={handleGoogleSubmit}>
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
