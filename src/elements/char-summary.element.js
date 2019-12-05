import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

class CharSummary extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: absolute;
          right: 1rem;
          top: 1rem;
          width: 28rem;
        }

        :host([hidden]) {
          display: none;
        }

        header {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }

        p {
          display: inline-block;
        }

        img {
          width: 4rem;
          hieght: 5rem;
        }

        section {
          border: 2px solid rgb(128, 128, 128);
          border-radius: 0.25rem;
          height: 1.5rem;
          margin-top: 1rem;
        }
      `
    ];
  }

  static get properties() {
    return {
      image: { type: String },
      life: { type: Number },
      maxLife: { type: Number, attribute: 'max-life' },
      name: { type: String },
      percent: { type: Number }
    };
  }

  currentLife() {
    this.percent = (this.life / this.maxLife) * 100;
    return styleMap({
      background: `linear-gradient(to right, green ${this.percent}%, transparent ${this.percent}%)`
    });
  }

  render() {
    if (!this.image || !this.name) {
      return;
    }
    return html`
      <header>
        <p>${this.name}</p>
        <img src="${this.image}" />
      </header>
      <section id="life" style="${this.currentLife()}"></section>
    `;
  }
}

customElements.define('char-summary', CharSummary);
