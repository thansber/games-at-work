import { LitElement, html, css } from 'lit-element';
import { commonCss } from '../css';

class SlideSelectChar extends LitElement {
  static get styles() {
    return [
      commonCss,
      css`
        h1 {
          font-size: 300%;
          text-align: center;
        }

        section {
          display: flex;
          justify-content: space-around;
          margin-top: 8rem;
        }

        [current] {
          box-shadow: 10px 10px 10px white;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  firstUpdated() {
    this.chars = Array.from(this.shadowRoot.querySelectorAll('char-selection'));
    this.chars[0].current = true;
  }

  render() {
    return html`
      <h1>Select a character</h1>

      <section>
        <char-selection image="images/board-games/operation.jpg"
          >The Witless Knight</char-selection
        >
        <char-selection image="images/board-games/operation.jpg"
          >The Spoony Bard</char-selection
        >
        <char-selection image="images/board-games/operation.jpg"
          >The Wise Sage</char-selection
        >
        <char-selection image="images/board-games/operation.jpg"
          >The Black Mage</char-selection
        >
      </section>
    `;
  }

  setSelection(direction) {
    let index = this.chars.findIndex(ch => ch.hasAttribute('current'));
    this.chars[index].current = false;

    index += direction;
    if (index < 0) {
      index = this.chars.length - 1;
    } else if (index >= this.chars.length) {
      index = 0;
    }
    this.chars[index].current = true;
  }
}

customElements.define('slide-select-char', SlideSelectChar);
