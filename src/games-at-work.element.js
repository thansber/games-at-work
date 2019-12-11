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

  onGamepadButtonDown(e) {
    switch (e.detail.button) {
      case '+':
      case '-':
        this.slideContainer.classList.add('show-notes');
        break;
    }
  }

  onGamepadButtonUp(e) {
    switch (e.detail) {
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
      case '+':
      case '-':
        this.slideContainer.classList.remove('show-notes');
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
      case 'n':
      case 'N':
        this.slideContainer.classList.toggle('show-notes');
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

      <gamepad-controller
        @gamepad-button-down="${this.onGamepadButtonDown}"
        @gamepad-button-up="${this.onGamepadButtonUp}"
      ></gamepad-controller>

      <th-slides id="slides" @slides-key="${this.onKey}" @slide-changed="${this.onSlideChange}">
        <th-slide>
          <slide-text text="Playing Games at Work"></slide-text>
          <p slot="notes">Introduce yourself</p>
        </th-slide>
        <th-slide>
          <slide-select-char id="selectChar"></slide-select-char>
          <p slot="notes">Explain each char</p>
        </th-slide>

        <th-slide>
          <slide-text text="Guess That Game" class="vertical-center"></slide-text>
          <p slot="notes">Explain rules and set expectations</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/sports/soccer.jpg"></slide-guess-game>
          <p slot="notes">Soccer, Futbol</p>
          <p slot="notes">fave moment from fave sport</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/sports/ninepin.jpg"></slide-guess-game>
          <p slot="notes">Ninepin Bowling</p>
          <p slot="notes">Mostly in Europe</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/sports/jai-alai.jpg"></slide-guess-game>
          <p slot="notes">Jai Alai</p>
          <p slot="notes">Board games next</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/board-games/operation.jpg"></slide-guess-game>
          <p slot="notes">Operation</p>
          <p slot="notes">Training surgeons everywhere</p>
          <p slot="notes">Ask about most lucrative operation? Charlie Horse</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/board-games/life.jpg"></slide-guess-game>
          <p slot="notes">Life</p>
          <p slot="notes">Wrote banking app cuz daughter wanted to play so much</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/board-games/azul.jpg"></slide-guess-game>
          <p slot="notes">Azul</p>
          <p slot="notes">GOTY 2018</p>
          <p slot="notes">Video Games next</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/video-games/carmen-sandiego-world.png"></slide-guess-game>
          <p slot="notes">Where in the World is Carmen Sandiego</p>
          <p slot="notes">Sing theme song from game show</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/video-games/oregon-trail2.png"></slide-guess-game>
          <p slot="notes">Oregon Trail</p>
          <p slot="notes">Teaching kids about horrible diseases</p>
        </th-slide>
        <th-slide>
          <slide-guess-game image="images/video-games/battletoads.png"></slide-guess-game>
          <p slot="notes">Battletoads</p>
          <p slot="notes">HARD - Impossible to complete with 2 players</p>
        </th-slide>

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
          <p slot="notes">Don't take yourself seriously</p>
        </th-slide>
        <th-slide>
          <slide-list heading="Approach 1 - SCORING">
            <ul>
              <li>Immediate, positive feedback</li>
              <li>Leaderboards</li>
            </ul>
          </slide-list>
          <p slot="notes">Give points to audience wearing a certain color</p>
          <p slot="notes">Easiest, most common form of gamification</p>
          <p slot="notes">Examples everywhere: Starbucks rewards cards, Fitbits, LOTR orc killing</p>
          <p slot="notes">Can act as a currency, feels icky</p>
          <p slot="notes">Easy to abuse both defining them and obtaining them - cheaters</p>
          <p slot="notes">Leaderboards may or may not be effective</p>
        </th-slide>
        <th-slide>
          <slide-list heading="Approach 2 - AVATARS">
            <ul>
              <li>Engages the user</li>
              <li>Further customization unlocks based on score</li>
            </ul>
          </slide-list>
          <p slot="notes">Miis good example</p>
          <p slot="notes">Completely optional</p>
        </th-slide>
        <th-slide>
          <slide-list heading="Approach 3 - EASTER EGGS">
            <ul>
              <li>Excitement promotes discovery</li>
              <li>Discovery promotes excitement</li>
            </ul>
          </slide-list>
          <p slot="notes">Ready Player One entire plot is finding easter eggs</p>
          <p slot="notes">Something API or backends can do</p>
        </th-slide>

        <th-slide><slide-text text="Playing Games at Work"></slide-text></th-slide>
        <th-slide><slide-text text="Play Games at Work"></slide-text></th-slide>

        <th-slide><slide-game-over></slide-game-over></th-slide>
      </th-slides>
    `;
  }
}

customElements.define('games-at-work', GamesAtWork);
