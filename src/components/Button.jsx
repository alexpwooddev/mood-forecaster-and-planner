import Button from "@material-ui/core/Button";
import styled from "styled-components";

export default styled(Button)`
  font-size: 0.6rem;
  background-color: var(--magenta);
  color: var(--white);
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  &:hover {
    background-color: var(--magenta-light);
  }

  &:not(:disabled):not(.disabled):active {
    transform: translateY(1px);
  }
`;
