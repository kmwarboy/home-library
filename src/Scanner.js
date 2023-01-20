import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import "./Scanner.scss";

const Scanner = () => {
	const [scanData, setScanData] = useState("");
	const [stopStream, setStopStream] = useState(false);
	const [bookData, setBookData] = useState(null);
	const [bookCoverArt, setBookCoverArt] = useState(null);

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
		// if no book covers show up from the first API, call this one
		if (bookData && !bookData[0].cover) {
			axios
				.get(`https://bookcover-api.onrender.com/bookcover/${scanData}`)
				.then((response) => {
					const bookCover = Object.values(response.data);
					setBookCoverArt(bookCover);
				});
		}
	}, [bookData, scanData]);

	console.log(bookData);
	console.log(bookCoverArt);

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
			<p>
				<strong>ISBN: </strong>
				{scanData}
			</p>
			{bookData && (
				<>
					<div>
						<img
							src={bookData[0].cover ? bookData[0].cover.medium : bookCoverArt}
							alt="cover art"
						/>
					</div>
					<div>
						<strong>Title: </strong> {bookData[0].title}
					</div>
					<div>
						<strong>Author: </strong>
						{bookData[0].authors[0].name}
					</div>
				</>
			)}
		</div>
	);
};

export default Scanner;
