import React from "react";
import { Link } from "react-router-dom";
// import Scanner from "../Scanner";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.scss";

const Dashboard = () => {
	return (
		<div>
			dashboard
			<br />
			<Link to="/">login</Link>
			{/* <Scanner /> */}
		</div>
	);
};

export default Dashboard;
