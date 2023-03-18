import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import "./Scanner.scss";

const Scanner = ({
	show,
	scannedBookData,
	scannedBookCoverArt,
	scannedISBN,
}) => {
	const [stopStream, setStopStream] = useState(false);
	const [scanData, setScanData] = useState("");
	const [bookData, setBookData] = useState(null);
	const [bookCoverArt, setBookCoverArt] = useState(null);

	// TODO:
	// 1. Refactor at some point to use node-fetch instead of axios
	// 2. Handle no book matched/found

	// If the scanner finds and ISBN (scanData), look for a match in this API and get the data for the book.
	useEffect(() => {
		if (scanData !== "") {
			setStopStream(true);
			axios
				.get(
					`https://openlibrary.org/api/books?bibkeys=ISBN:${scanData}&jscmd=data&format=json`
				)
				.then((response) => {
					const data = Object.values(response.data);
					setBookData(data);
				});
		}
	}, [scanData]);

	useEffect(() => {
		// If no book covers show up from the first API, call this one
		if (bookData && !bookData[0]?.cover) {
			console.log("no cover");
			axios
				.get(`https://bookcover-api.onrender.com/bookcover/${scanData}`)
				.then((response) => {
					const bookCover = Object.values(response.data);
					setBookCoverArt(bookCover);
				});
		}
	}, [bookData, scanData]);

	// Hoist the data from this component up to the Dashboard via these functions/props so it can be displayed in the Modal.
	if (scanData) {
		scannedISBN(scanData);
	}
	if (bookData) {
		scannedBookData(bookData);
	}
	if (bookCoverArt) {
		scannedBookCoverArt(bookCoverArt);
	}

	if (!show) return null;

	return (
		<div>
			<BarcodeScannerComponent
				width={500}
				height={500}
				facingMode="environment"
				onUpdate={(err, result) => {
					if (result) setScanData(result.text);
				}}
				stopStream={stopStream}
			/>
		</div>
	);
};

export default Scanner;
