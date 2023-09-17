import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import "./Scanner.scss";

const Scanner = ({ show, scannedBookData, scannedISBN }) => {
	const [stopStream, setStopStream] = useState(false);
	const [scanData, setScanData] = useState("");
	const [bookData, setBookData] = useState(null);

	// TODO:
	// 1. Refactor at some point to use node-fetch instead of axios
	// 2. Handle no book matched/found

	// Using google books API
	useEffect(() => {
		if (scanData !== "") {
			setStopStream(true);
			axios
				.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${scanData}`)
				.then((response) => {
					const data = Object.values(response.data);
					setBookData(data[2]);
				});
		}
	}, [scanData]);

	// Hoist the data from this component up to the Dashboard via these functions/props so it can be displayed in the Modal.
	if (scanData) {
		scannedISBN(scanData);
	}
	if (bookData) {
		scannedBookData(bookData);
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
