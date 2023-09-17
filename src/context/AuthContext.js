import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithRedirect,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		// signInWithPopup(auth, provider);
		signInWithRedirect(auth, provider);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser);
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password, user);
	};

	const logout = () => {
		return signOut(auth);
	};

	return (
		<UserContext.Provider
			value={{ createUser, googleSignIn, user, signIn, logout }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
