import { LitElement, html, css } from 'lit-element';

import './elements';

class GamesAtWork extends LitElement {
  constructor() {
    super();
    this.selectedChar = { name: '' };
    this.slides = [];
  }

  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      numSlides: { type: Number },
      selectedChar: { type: Object },
      slideIndex: { type: Number }
    };
  }

  firstUpdated() {
    this.slides = Array.from(this.shadowRoot.querySelectorAll('th-slide'));
    this.numSlides = this.slides.length;
    this.selectChar = this.shadowRoot.getElementById('selectChar');
  }

  getCurrentSlideContent() {
    const index = this.getCurrentSlideIndex();
    if (index >= 0) {
      return this.slides[index].firstElementChild;
    }
  }

  getCurrentSlideIndex() {
    return this.slides.findIndex(slide => slide.hasAttribute('current'));
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
        }
        break;
    }
  }

  onSlideChange(e) {
    this.slideIndex = e.detail;
  }

  render() {
    return html`
      <char-summary
        image="${this.selectedChar.image}"
        name="${this.selectedChar.name}"
        life="${this.numSlides - this.slideIndex}"
        max-life="${this.numSlides}"
        ?hidden="${this.slideIndex <= 1}"
      ></char-summary>

      <th-slides @slides-key="${this.onKey}" @slide-changed="${this.onSlideChange}">
        <th-slide><slide-text text="Playing Games at Work"></slide-text></th-slide>
        <th-slide><slide-select-char id="selectChar"></slide-select-char></th-slide>
        <th-slide><slide-text text="Guess That Game"></slide-text></th-slide>
        <th-slide><slide-guess-game image="images/sports/soccer.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/sports/ninepin.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/sports/jai-alai.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/board-games/operation.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/board-games/life.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/board-games/azul.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/video-games/carmen-sandiego-world.png"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/video-games/oregon-trail2.png"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/video-games/battletoads.png"></slide-guess-game></th-slide>
      </th-slides>
    `;
  }
}

customElements.define('games-at-work', GamesAtWork);
