import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import styled from 'styled-components';

export default styled(ChevronRight)`
  && {
    font-style: normal;
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "liga";
    background-color: var(--magenta);
    color: var(--white);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    flex: 0 0 auto;
    overflow: visible;
    font-size: 1.5rem;
    text-align: center;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 10%;
    margin: 0 1px;
    font-size: 16px;
    height: 28px;
    width: 47px;
    cursor: pointer;

    &:hover {
      background-color: var(--magenta-light);
    }

    &:not(:disabled):not(.disabled):active {
      transform: translateY(1px);
    }
  }
`;
