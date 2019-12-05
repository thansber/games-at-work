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
        this.nextSlide();
        break;
      case 'z':
      case 'Z':
        this.previousSlide();
        break;
    }

    this.dispatchEvent(
      new CustomEvent('slides-key', {
        detail: e.key
      })
    );
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
    const newIndex = index + direction;

    if (newIndex < 0) {
      return;
    }
    if (newIndex >= this.slides.length) {
      return;
    }

    if (index > -1) {
      this.slides[index].current = false;
    }
    this.slides[newIndex].current = true;

    this.dispatchEvent(new CustomEvent('slide-changed', { detail: newIndex }));
  }
}

customElements.define('th-slides', Slides);
