import { LitElement, html, css } from 'lit-element';

class Slide extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }
      `
    ];
  }

  static get properties() {
    return {
      current: { type: Boolean, reflect: true }
    };
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('th-slide', Slide);
