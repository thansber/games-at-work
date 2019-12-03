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

  render() {
    return html`
      <th-slides>
        <th-slide>Slide 1</th-slide>
        <th-slide>Slide 2</th-slide>
        <th-slide>Slide 3</th-slide>
      </th-slides>
    `;
  }
}

customElements.define('games-at-work', GamesAtWork);
