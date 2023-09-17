import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { googleSignIn, user, signIn } = UserAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await signIn(email, password);
		} catch (event) {
			setError(event.message);
			alert(error);
		}
	};

	const handleGoogleSubmit = async (event) => {
		event.preventDefault();
		try {
			await googleSignIn();
		} catch (event) {
			setError(event.message);
			alert(event.message);
		}
	};

	async function checkUser() {
		const currentUid = user.uid;
		const usersRef = collection(db, "librarians");
		// Create a query against the collection.
		const userQuery = query(usersRef, where("uid", "==", currentUid));
		const querySnapshot = await getDocs(userQuery);

		if (querySnapshot.empty === true) {
			console.log("no match");
			addDoc(collection(db, "librarians"), {
				uid: user.uid,
				name: user.displayName,
				email: user.email,
				avatar: user.photoURL,
				books: [],
			});
		} else {
			console.log("user already exists!");
		}
	}

	useEffect(() => {
		if (user != null) {
			console.log(user);
			navigate("/dashboard");
			checkUser();
		}
	});

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
								onChange={(event) => setEmail(event.target.value)}
							/>
						</div>
						<div className="login-field">
							<label htmlFor="password">password: </label>
							<input
								name="password"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
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
