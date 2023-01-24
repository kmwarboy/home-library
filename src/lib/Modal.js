import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./Modal.scss";

const Modal = ({ open, children, onClose }) => {
	if (!open) return null;

	return (
		<>
			<div className="overlay">
				<div className="modal-container">
					<div className="top-bar">
						<FontAwesomeIcon
							icon={faClose}
							className="close-button"
							onClick={(event) => {
								event.preventDefault();
								onClose();
							}}
						/>
					</div>
					{children}
				</div>
			</div>
		</>
	);
};

export default Modal;
