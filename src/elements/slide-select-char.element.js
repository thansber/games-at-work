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

  getSelectedChar() {
    const selected = this.chars.find(ch => ch.hasAttribute('current'));
    return {
      image: selected.getAttribute('image'),
      name: selected.innerHTML
    };
  }

  render() {
    return html`
      <h1>Select a player</h1>

      <section>
        <char-selection image="images/char1.png">The Witless Knight</char-selection>
        <char-selection image="images/char2.png">The Spoony Bard</char-selection>
        <char-selection image="images/char3.png">The Wise Sage</char-selection>
        <char-selection image="images/char4.png">The Black Mage</char-selection>
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
