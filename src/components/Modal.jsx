import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import Button from "./Button";

const Modal = ({ title, message, hide }) =>
  ReactDOM.createPortal(
    <Container>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody>{message}</ModalBody>
        <Button onClick={hide}>Close</Button>
      </ModalContent>
    </Container>,
    document.body
  );

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Modal;

const Container = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--magenta);
`;

const ModalContent = styled.div`
  width: 250px;
  max-width: 75vw;
  max-height: calc(100vh - 1rem);
  background: var(--white);
  border-radius: 5px;
  padding: 20px 30px 20px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

const ModalTitle = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  margin: var(--margin-m);
  line-height: 1.5;
  margin: 0;
`;

const ModalBody = styled.p`
  font-size: 0.8rem;
  margin: var(--margin-m);
  text-align: center;
`;
