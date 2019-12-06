import { LitElement, html, css } from 'lit-element';

class CharSelection extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          font-size: 250%;
          position: relative;
          width: 10rem;
        }

        :host([current])::before {
          background-image: url('images/cursor.png');
          background-repeat: no-repeat;
          background-size: cover;
          content: ' ';
          display: inline-block;
          height: 3rem;
          left: -4rem;
          position: absolute;
          top: 0.25rem;
          width: 3rem;
        }

        img {
          width: 160px;
          height: 195px;
        }

        span {
          line-height: 3rem;
          text-align: center;
        }
      `
    ];
  }

  static get properties() {
    return {
      current: { type: Boolean, reflect: true },
      desc: { type: String },
      image: { type: String }
    };
  }

  render() {
    return html`
      <img src="${this.image}" />
      <span><slot></slot></span>
    `;
  }
}

customElements.define('char-selection', CharSelection);
