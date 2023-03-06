import React, { useEffect, useState } from "react";
import Modal from "../lib/Modal";
import { Button } from "react-bootstrap";
import Navbar from "../lib/Navbar";
import Scanner from "../Scanner/Scanner";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.scss";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";

/*TODO

1. db to store books for users
2. api call to db to retrieve books. base dashboard off that data.
3. if no books are in the users library display a 'get started' message + button for scanner
4. if books are in the library, display 'scan a book' button, sort + filter options, and the books in cards

*/

const Dashboard = () => {
	const [openModal, setOpenModal] = useState(false);
	const [startScan, setStartScan] = useState(false);
	const [bookData, setBookData] = useState(null);
	const [bookCoverArt, setBookCoverArt] = useState(null);
	const [scanData, setScanData] = useState(null);

	const scannedISBN = (scanData) => {
		setScanData(scanData);
	};
	const scannedBookData = (bookData) => {
		setBookData(bookData);
	};
	const scannedBookCoverArt = (bookCoverArt) => {
		setBookCoverArt(bookCoverArt);
	};

	useEffect(() => {
		if (scanData && bookData !== null) {
			setOpenModal(true);
			setStartScan(false);
		}
	}, [scanData, bookData]);

	useEffect(() => {
		if (!openModal) {
			setBookCoverArt(null);
			setBookData(null);
			setScanData(null);
		}
	}, [openModal]);

	const addBook = async (evt) => {
		evt.preventDefault();
		try {
			console.log("trying");
			addDoc(collection(db, "books"), {
				isbn: scanData,
				title: bookData[0].title,
				author: bookData[0].authors[0].name,
				cover: bookData[0].cover ? bookData[0].cover.medium : bookCoverArt,
			});
			console.log("success");
		} catch (evt) {
			console.error("error adding book: ", evt);
		}
	};

	console.log(scanData);
	console.log(bookData);

	return (
		<>
			<div className="dashboard-container">
				<Navbar />

				<div className="dashboard-inner">
					<div className="welcome-message">
						it looks like you have no books in your library yet. click the
						button below to get started!
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
					{startScan && (
						<>
							<Scanner
								show={startScan}
								hide={() => setStartScan(false)}
								scannedBookData={scannedBookData}
								scannedBookCoverArt={scannedBookCoverArt}
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
												src={
													bookData[0].cover
														? bookData[0].cover.medium
														: bookCoverArt
												}
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
												<strong>Title: </strong> {bookData[0].title}
											</div>
											<div className="book-author">
												<strong>Author: </strong>
												{bookData[0].authors[0].name}
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
								onClick={(evt) => {
									// alert("TODO-add book to firebase collection");
									addBook(evt);
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
