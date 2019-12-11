import { LitElement, html, css } from 'lit-element';

class Slide extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }

        #notes {
          bottom: 1rem;
          color: var(--notes);
          display: none;
          position: absolute;
          right: 1rem;
        }

        #notes ::slotted(*) {
          margin: 0;
        }

        :host-context(.show-notes) #notes {
          display: block;
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
      <section id="notes"><slot name="notes"></slot></section>
    `;
  }
}

customElements.define('th-slide', Slide);
