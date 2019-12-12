import { LitElement, html, css } from 'lit-element';

class SlideList extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8rem 3rem 0 3rem;
        }

        h1 {
          font-size: 550%;
          line-height: 4rem;
          margin-left: 0rem;
        }

        ::slotted(ul) {
          font-size: 400%;
          list-style-type: square;
          margin: 2rem 0 0 2rem;
        }

        ::slotted(ul.no-marker) {
          list-style-type: none;
        }

        ::slotted(h2) {
          font-size: 600%;
          margin: 0 0 2rem 0;
          text-align: center;
        }

        ::slotted(h2:first-child) {
          margin-top: 2.5rem;
        }
      `
    ];
  }

  static get properties() {
    return {
      heading: { type: String }
    };
  }

  render() {
    return html`
      <h1>${this.heading}</h1>
      <slot></slot>
    `;
  }
}

customElements.define('slide-list', SlideList);
