import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import SignUp from "./Login/SignUp";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
				{/* <Login /> */}
			</BrowserRouter>
		</div>
	);
}

export default App;
