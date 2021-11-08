/* eslint-disable */
import React from "react";
import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PropTypes from "prop-types";
import styled from "styled-components/macro";


const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

const AutoSaveDisplay = ({ saving }) => {
  let display;
  switch (saving) {
    case SavingState.NOT_SAVED:
      display = (
        <div>
          <StyledP>Saving</StyledP>
          <CachedIcon />
        </div>
      );
      break;
    case SavingState.SAVING:
      display = (
        <div>
          <StyledP>Saving</StyledP>
          <CachedIcon />
        </div>
      );
      break;
    case SavingState.SAVED:
      display = (
        <div>
          <StyledP>Saved</StyledP>
          <CheckCircleOutlineIcon />
        </div>
      );
      break;
    default:
      display = <br />;
  }
  return <StyledAutoSaveDisplay>{display}</StyledAutoSaveDisplay>;
};

AutoSaveDisplay.propTypes = {
  saving: PropTypes.number.isRequired,
};

export default AutoSaveDisplay;

const StyledAutoSaveDisplay = styled.div`
  margin: var(--margin-m);
  margin-bottom: 0;
`;

const StyledP = styled.p`
  margin-bottom: var(--margin-xs);
`;
