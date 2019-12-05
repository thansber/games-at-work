import { LitElement, html, css } from 'lit-element';

import { commonCss } from '../css';

class SlideText extends LitElement {
  static get styles() {
    return [
      commonCss,
      css`
        :host {
        }
      `
    ];
  }

  static get properties() {
    return {
      text: { type: String }
    };
  }

  render() {
    return html`
      ${this.text.split(' ').map(
        word =>
          html`
            <h1>${word}</h1>
          `
      )}
    `;
  }
}

customElements.define('slide-text', SlideText);
