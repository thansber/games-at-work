import { LitElement, html, css } from 'lit-element';
import { commonCss } from '../css';

class SlideGuessGame extends LitElement {
  static get styles() {
    return [
      commonCss,
      css`
        :host {
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        img {
          width: 50%;
        }
      `
    ];
  }

  static get properties() {
    return {
      image: { type: String }
    };
  }

  render() {
    return html`
      <img src="${this.image}" />
    `;
  }
}

customElements.define('slide-guess-game', SlideGuessGame);
