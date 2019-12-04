import { LitElement, html, css } from 'lit-element';

import './elements';

class GamesAtWork extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  firstUpdated() {
    this.selectChar = this.shadowRoot.getElementById('selectChar');
  }

  onKey(e) {
    switch (e.detail) {
      case 'ArrowLeft':
        this.selectChar.setSelection(-1);
        break;
      case 'ArrowRight':
        this.selectChar.setSelection(1);
        break;
    }
  }

  render() {
    return html`
      <th-slides @slides-key="${this.onKey}">
        <th-slide current><slide-intro></slide-intro></th-slide>
        <th-slide
          ><slide-select-char id="selectChar"></slide-select-char
        ></th-slide>
        <th-slide>Slide 3</th-slide>
      </th-slides>
    `;
  }
}

customElements.define('games-at-work', GamesAtWork);
