import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.scss";

const Dashboard = () => {
	return (
		<div>
			hello dashboard
			<Link to="/">login</Link>
		</div>
	);
};

export default Dashboard;
