import { css } from 'lit-element';

export const commonCss = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
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
