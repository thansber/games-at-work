import { LitElement, html, css } from 'lit-element';

import { commonCss } from '../css';

class SlideIntro extends LitElement {
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
    return {};
  }

  render() {
    return html`
      <h1>Playing</h1>
      <h1>Games</h1>
      <h1>at</h1>
      <h1>Work</h1>
    `;
  }
}

customElements.define('slide-intro', SlideIntro);
