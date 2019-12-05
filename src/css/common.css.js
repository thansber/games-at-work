import { css } from 'lit-element';

export const commonCss = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 3rem;
  }

  h1 {
    font-size: 400%;
    font-weight: normal;
    margin: 2rem 0;
    text-transform: uppercase;
  }
`;
