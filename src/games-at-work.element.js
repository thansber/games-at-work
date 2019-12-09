import { LitElement, html, css } from 'lit-element';

import './elements';

class GamesAtWork extends LitElement {
  constructor() {
    super();
    this.selectedChar = { name: '' };
    this.slides = [];
  }

  static get styles() {
    return [
      css`
        li {
          line-height: 4.5rem;
          margin-bottom: 3.5rem;
        }

        li.dim {
          opacity: 0.2;
        }
      `
    ];
  }

  static get properties() {
    return {
      numSlides: { type: Number },
      selectedChar: { type: Object },
      slideIndex: { type: Number }
    };
  }

  firstUpdated() {
    this.slideContainer = this.shadowRoot.getElementById('slides');
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

  isCharSummaryHidden() {
    return this.slideIndex <= 1 || this.slideIndex === this.slides.length - 1;
  }

  onGamepadButton(e) {
    switch (e.detail.button) {
      case 'A':
      case 'X':
      case 'Right':
      case 'Down':
        this.slideContainer.nextSlide();
        break;
      case 'B':
      case 'Y':
      case 'Left':
      case 'Up':
        this.slideContainer.previousSlide();
        break;
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
        ?hidden="${this.isCharSummaryHidden()}"
      ></char-summary>

      <gamepad-controller @gamepad-button=${this.onGamepadButton}></gamepad-controller>

      <th-slides id="slides" @slides-key="${this.onKey}" @slide-changed="${this.onSlideChange}">
        <th-slide><slide-text text="Playing Games at Work"></slide-text></th-slide>
        <th-slide><slide-select-char id="selectChar"></slide-select-char></th-slide>

        <th-slide><slide-text text="Guess That Game" class="vertical-center"></slide-text></th-slide>
        <th-slide><slide-guess-game image="images/sports/soccer.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/sports/ninepin.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/sports/jai-alai.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/board-games/operation.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/board-games/life.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/board-games/azul.jpg"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/video-games/carmen-sandiego-world.png"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/video-games/oregon-trail2.png"></slide-guess-game></th-slide>
        <th-slide><slide-guess-game image="images/video-games/battletoads.png"></slide-guess-game></th-slide>

        <th-slide><slide-list heading="Why do we play games?"></slide-list></th-slide>
        <th-slide>
          <slide-list heading="Why do we play games?">
            <ul>
              <li>Fun</li>
            </ul>
          </slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Why do we play games?">
            <ul>
              <li class="dim">Fun</li>
              <li>Interaction with others</li>
            </ul>
          </slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Why do we play games?">
            <ul>
              <li class="dim">Fun</li>
              <li class="dim">Interaction with others</li>
              <li>Competition</li>
            </ul>
          </slide-list>
        </th-slide>

        <th-slide>
          <slide-list heading="Where do we play games?"></slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Where do we play games?">
            <h2>NOT AT WORK</h2>
          </slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Where do we play games?">
            <h2>NOT AT WORK</h2>
            <h2>WHY NOT?</h2>
          </slide-list>
        </th-slide>

        <th-slide>
          <slide-list heading="Gamification">
            <ul class="no-marker">
              <li>The application of typical elements of game playing to other areas of activity</li>
            </ul>
          </slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Gamification">
            <ul class="no-marker">
              <li class="dim">The application of typical elements of game playing to other areas of activity</li>
              <li>Helps make boring tasks more fun</li>
            </ul>
          </slide-list>
        </th-slide>

        <th-slide>
          <slide-list heading="How do we play games at work?"></slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="How do we play games at work?">
            <h2>EMBRACE WHIMSY</h2>
          </slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Approach 1 - SCORING">
            <ul>
              <li>Immediate, positive feedback</li>
              <li>Leaderboards</li>
            </ul>
          </slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Approach 2 - AVATARS">
            <ul>
              <li>Engages the user</li>
              <li>Further customization unlocks based on score</li>
            </ul>
          </slide-list>
        </th-slide>
        <th-slide>
          <slide-list heading="Approach 3 - EASTER EGGS">
            <ul>
              <li>Promotes discovery</li>
              <li>Promotes excitement</li>
            </ul>
          </slide-list>
        </th-slide>

        <th-slide><slide-text text="Playing Games at Work"></slide-text></th-slide>
        <th-slide><slide-text text="Play Games at Work"></slide-text></th-slide>

        <th-slide><slide-game-over></slide-game-over></th-slide>
      </th-slides>
    `;
  }
}

customElements.define('games-at-work', GamesAtWork);
