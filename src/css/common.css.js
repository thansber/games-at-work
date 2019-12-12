import { css } from 'lit-element';

export const commonCss = css`
  :host {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 7rem);
    padding: 3rem;
  }

  :host(.vertical-center) {
    justify-content: center;
  }

  h1 {
    font-size: 600%;
    font-weight: normal;
    margin: 1rem 0;
  }
`;
