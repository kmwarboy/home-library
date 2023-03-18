import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";

const Navbar = () => {
	const navigate = useNavigate();
	const { logout } = UserAuth();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
			console.log("you are logged out");
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div className="navbar-container">
			<div className="navbar-inner">
				<div className="navbar-title">
					<FontAwesomeIcon icon={faBookReader} />
					<h2>little home library</h2>
				</div>
				<div className="navbar-links">
					<Link to="/" onClick={handleLogout}>
						sign out
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
