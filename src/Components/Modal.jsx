import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
        <button onClick={onClose} className="modal-close-btn">×</button>
      </div>
    </div>
  );
};

export default Modal;
