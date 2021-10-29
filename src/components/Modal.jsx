import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./Modal.css";

const Modal = ({ title, message, hide }) => ReactDOM.createPortal(
  <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
      </div>
      <div className="modal-body">{message}</div>
      <div className="modal-footer">
        <button
          id="modal-close-button"
          type="button"
          className="btn btn-secondary"
          onClick={hide}
        >
          <p>Close</p>
        </button>
      </div>
    </div>
  </div>,
  document.body
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Modal;
