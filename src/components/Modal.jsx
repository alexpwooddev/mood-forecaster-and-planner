import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import "./Modal.css";

const Modal = ({ title, message, hide }) =>
  ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-body">{message}</p>
        <Button onClick={hide}>
          Close
        </Button>
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
