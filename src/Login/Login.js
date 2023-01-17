import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";

const Login = () => {
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
							<input name="username" type="text" />
						</div>
						<div className="login-field">
							<label htmlFor="password">password: </label>
							<input name="password" type="password" />
						</div>
						<button className="login-submit" type="submit">
							submit
						</button>
					</form>
				</div>
				<div className="login-signup">
					<p>
						new here? <a href="/">sign up</a>.
					</p>
				</div>
				<Link to="/dashboard">Dashboard</Link>
			</div>
		</div>
	);
};

export default Login;
