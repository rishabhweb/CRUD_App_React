import React from 'react'

const Modal = ({handleClose, show, children}) => {

	const showHideComponent = show ? "modal d-block" : "modal d-none";

	return (
		<div className={showHideComponent} >
			<div className = "modal-container">
				{children}
			</div>
		</div>
	)
}

export default Modal;