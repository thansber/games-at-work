import { LitElement, html, css } from 'lit-element';

class SlideList extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8rem 3rem 3rem;
        }

        h1 {
          font-size: 300%;
          margin-left: 2rem;
        }

        ::slotted(ul) {
          font-size: 250%;
          list-style-type: square;
          margin-left: 2rem;
          margin-top: 4rem;
        }

        ::slotted(ul.no-marker) {
          list-style-type: none;
        }

        ::slotted(h2) {
          font-size: 250%;
          text-align: center;
        }

        ::slotted(h2:first-child) {
          margin-top: 7.5rem;
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
