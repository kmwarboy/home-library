import React, { useEffect, useState } from "react";
import Modal from "../lib/Modal";
import { Button } from "react-bootstrap";
import Navbar from "../lib/Navbar";
import Scanner from "../Scanner/Scanner";
import "./Dashboard.scss";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { UserAuth } from "../context/AuthContext";

/*TODO

1. add a users table with an array of book ids - DONE 9/16
2. figure out how to store books in the array of books for each user - WORK ON NEXT
3. api call to db to retrieve books. base dashboard off that data. - DONE 9/16
4. if no books are in the users library display a 'get started' message + button for scanner - DONE 9/16
5. if books are in the library, display 'scan a book' button, sort + filter options, and the books in cards

*/

const Dashboard = () => {
	const [openModal, setOpenModal] = useState(false);
	const [startScan, setStartScan] = useState(false);
	const [bookData, setBookData] = useState(null);
	const [scanData, setScanData] = useState(null);
	const { user } = UserAuth();
	const [currentLibrarian, setCurrentLibrarian] = useState("");
	const [availableBooks, setAvailableBooks] = useState();

	const scannedISBN = (scanData) => {
		setScanData(scanData);
	};
	const scannedBookData = (bookData) => {
		setBookData(bookData);
	};

	useEffect(() => {
		if (scanData && bookData !== null) {
			setOpenModal(true);
			setStartScan(false);
		}
	}, [scanData, bookData]);

	useEffect(() => {
		if (!openModal) {
			setBookData(null);
			setScanData(null);
		}
	}, [openModal]);

	async function checkUser() {
		const currentUid = user.uid;
		const usersRef = collection(db, "librarians");
		// Create a query against the collection.
		const userQuery = query(usersRef, where("uid", "==", currentUid));
		const querySnapshot = await getDocs(userQuery);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setCurrentLibrarian(doc.data());
		});
	}

	let bookshelf = [];
	async function getBookshelf() {
		if (currentLibrarian.books) {
			const userBooks = currentLibrarian.books;
			const querySnapshot = await getDocs(collection(db, "books"));
			querySnapshot.forEach((doc) => {
				if (userBooks.includes(doc.id)) {
					bookshelf.push(doc.data());
				}
			});
			setAvailableBooks(bookshelf);
		}
	}

	useEffect(() => {
		checkUser();
	}, [user]);

	useEffect(() => {
		getBookshelf();
	}, [currentLibrarian]);

	const addBook = async (event) => {
		event.preventDefault();
		try {
			addDoc(collection(db, "books"), {
				isbn: scanData,
				title: bookData[0].volumeInfo.title,
				author: bookData[0].volumeInfo.authors[0],
				cover: bookData[0].volumeInfo.imageLinks.thumbnail,
			});
			console.log("success");
			setOpenModal(false);
		} catch (event) {
			console.error("error adding book: ", event);
		}
	};

	return (
		<>
			<div className="dashboard-container">
				<Navbar />

				<div className="dashboard-inner">
					<div className="dashboard-inner__user-books">
						{availableBooks ? (
							<>
								<div>
									welcome back! browse your bookshelf, or click the button below
									to add a new book.
								</div>
							</>
						) : (
							<div>
								<div className="welcome-message">
									it looks like you have no books in your library yet. click the
									button below to get started!
								</div>
							</div>
						)}
					</div>
					<Button
						onClick={(event) => {
							event.preventDefault();
							// setAddBookModal();
							// alert("TODO - modal with scanner + book info");
							// setOpenModal(true);
							setStartScan(true);
						}}
					>
						scan a book
					</Button>

					{availableBooks && (
						<div className="bookshelf-container">
							{availableBooks.map((book) => (
								<>
									<div className="bookshelf-card">
										{/* book cover doesn't work - not an image, just path to an image */}
										<image src={book.cover} />
										<h2>{book.title}</h2>
										<h3>{book.author}</h3>
									</div>
								</>
							))}
						</div>
					)}

					{startScan && (
						<>
							<Scanner
								show={startScan}
								hide={() => setStartScan(false)}
								scannedBookData={scannedBookData}
								scannedISBN={scannedISBN}
							/>
						</>
					)}

					{openModal && (
						<Modal open={openModal} onClose={() => setOpenModal(false)}>
							<div className="dashboard-modal">
								{bookData && (
									<>
										<div className="modal-left">
											<img
												src={bookData[0].volumeInfo.imageLinks.thumbnail}
												alt="cover art"
												className="book-cover"
											/>
										</div>
										<div className="modal-right">
											<div className="book-isbn">
												<p>
													<strong>ISBN: </strong>
													{scanData}
												</p>
											</div>
											<div className="book-title">
												<strong>Title: </strong> {bookData[0].volumeInfo.title}
											</div>
											<div className="book-author">
												<strong>Author: </strong>
												{bookData[0].volumeInfo.authors[0]}
											</div>
											{/* Need to figure out the best way to do genre - data not consistent */}
											{/* <div className="book-author">
												<strong>Genres: </strong>
												{bookData[0].subjects[6].name}
											</div> */}
										</div>
									</>
								)}
							</div>
							<button
								onClick={(event) => {
									addBook(event);
								}}
							>
								add book to library
							</button>
						</Modal>
					)}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
