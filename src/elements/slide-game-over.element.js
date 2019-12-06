import { LitElement, html, css } from 'lit-element';

class SlideGameOver extends LitElement {
  static get styles() {
    return [
      css`
        img {
          height: 100vh;
          margin-left: 15%;
        }

        h1 {
          font-size: 800%;
          position: absolute;
          right: 3rem;
          top: 0;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <img src="images/game-over.png" />
      <h1>GAME OVER</h1>
    `;
  }
}

customElements.define('slide-game-over', SlideGameOver);
