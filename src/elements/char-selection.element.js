import { LitElement, html, css } from 'lit-element';

class CharSelection extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          font-size: 150%;
          width: 10rem;
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
