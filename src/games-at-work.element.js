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
    return {
      selectedChar: { type: Object }
    };
  }

  firstUpdated() {
    this.slides = Array.from(this.shadowRoot.querySelectorAll('th-slide'));
    this.selectChar = this.shadowRoot.getElementById('selectChar');
  }

  getCurrentSlideContent() {
    const index = this.slides.findIndex(slide => slide.hasAttribute('current'));
    if (index >= 0) {
      return this.slides[index].firstElementChild;
    }
  }

  onKey(e) {
    const currentSlideContent = this.getCurrentSlideContent();
    const isSelectChar = 'selectChar' === currentSlideContent.id;

    switch (e.detail) {
      case 'ArrowLeft':
        isSelectChar && this.selectChar.setSelection(-1);
        break;
      case 'ArrowRight':
        isSelectChar && this.selectChar.setSelection(1);
        break;
      case 'Enter':
        if (isSelectChar) {
          this.selectedChar = this.selectChar.getSelectedChar();
          debugger;
        }
        break;
    }
  }

  render() {
    return html`
      <th-slides @slides-key="${this.onKey}">
        <th-slide current><slide-intro></slide-intro></th-slide>
        <th-slide><slide-select-char id="selectChar"></slide-select-char></th-slide>
        <th-slide>Slide 3</th-slide>
      </th-slides>
    `;
  }
}

customElements.define('games-at-work', GamesAtWork);
