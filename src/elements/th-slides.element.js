import { LitElement, html, css } from 'lit-element';

class Slides extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.keyHandler = this.onKey.bind(this);
    document.addEventListener('keyup', this.keyHandler);
  }

  disconnectedCallback() {
    document.removeEventListener('keyup', this.keyHandler);
    super.disconnectedCallback();
  }

  static get styles() {
    return [
      css`
        :host {
        }

        ::slotted(*) {
          display: none;
        }

        ::slotted([current]) {
          display: block;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  nextSlide() {
    this.setCurrentSlide(1);
  }

  onKey(e) {
    switch (e.key) {
      case 'x':
      case 'X':
      case ' ':
      case 'Enter':
      case 'ArrowRight':
      case 'ArrowDown':
        this.nextSlide();
        break;
      case 'z':
      case 'Z':
      case 'ArrowLeft':
      case 'ArrowUp':
        this.previousSlide();
        break;
      default:
        console.log(e.key);
    }
  }

  onSlotChange(e) {
    this.slides = e.currentTarget.assignedElements();
    this.nextSlide();
  }

  previousSlide() {
    this.setCurrentSlide(-1);
  }

  render() {
    return html`
      <slot @slotchange="${this.onSlotChange}"></slot>
    `;
  }

  setCurrentSlide(direction) {
    if (!this.slides.length) {
      return;
    }
    const index = this.slides.findIndex(slide => slide.hasAttribute('current'));

    if (index + direction < 0) {
      return;
    }
    if (index + direction >= this.slides.length) {
      return;
    }

    if (index > -1) {
      this.slides[index].current = false;
    }
    this.slides[index + direction].current = true;
  }
}

customElements.define('th-slides', Slides);
