import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";

const Navbar = () => {
	return (
		<div className="navbar-container">
			<div className="navbar-inner">
				<div className="navbar-title">
					<FontAwesomeIcon icon={faBookReader} />
					<h2>little home library</h2>
				</div>
				<div className="navbar-links">
					<Link to="/">sign out</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
