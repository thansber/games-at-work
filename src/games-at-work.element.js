import { LitElement, html, css } from 'lit-element';

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

  render() {
    return html`
      GAMES AT WORK
    `;
  }
}

customElements.define('games-at-work', GamesAtWork);
