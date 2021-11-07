import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

export default styled(IconButton)`
  && {
    background-color: var(--magenta);
    color: var(--white);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    flex: 0 0 auto;
    color: rgba(0, 0, 0, 0.54);
    padding: 2px;
    overflow: visible;
    font-size: 1.5rem;
    text-align: center;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 10%;
    margin: 0 1px;
    color: white;
    font-size: 16px;
    background-color: var(--magenta);
    height: 28px;
    width: 47px;

    &:hover {
      background-color: var(--magenta-light);
    }

    &:not(:disabled):not(.disabled):active {
      transform: translateY(1px);
    }
  }
`;
