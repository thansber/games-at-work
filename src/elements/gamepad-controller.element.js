import { LitElement, html, css } from 'lit-element';

class GamepadController extends LitElement {
  constructor() {
    super();

    this.listenEvery = 300;
    this.mapping = 'nintendo';

    this.gamepadMap = {
      'Joy-Con \\(L\\)': {
        0: {
          nintendo: 'Left'
        },
        1: {
          nintendo: 'Down'
        },
        2: {
          nintendo: 'Up'
        },
        3: {
          nintendo: 'Right'
        },
        4: {
          nintendo: 'SL'
        },
        5: {
          nintendo: 'SR'
        },
        6: {
          nintendo: 'ZL'
        },
        8: {
          nintendo: 'L'
        },
        9: {
          nintendo: '-'
        },
        16: {
          nintendo: 'Home'
        }
      },
      'Joy-Con \\(R\\)': {
        0: {
          nintendo: 'A'
        },
        1: {
          nintendo: 'X'
        },
        2: {
          nintendo: 'B'
        },
        3: {
          nintendo: 'Y'
        },
        4: {
          nintendo: 'SL'
        },
        5: {
          nintendo: 'SR'
        },
        7: {
          nintendo: 'ZR'
        },
        8: {
          nintendo: 'R'
        },
        9: {
          nintendo: '+'
        },
        16: {
          nintendo: 'Home'
        }
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.gamepadListener = setInterval(this.pollGamepad.bind(this), this.listenEvery);
  }

  disconnectedCallback() {
    clearInterval(this.gamepadListener);
    super.disconnectedCallback();
  }

  pollGamepad() {
    const gamepads = Array.from(navigator.getGamepads()).filter(Boolean);
    if (gamepads.length) {
      const gamepad = gamepads[0];
      const gamepadId = Object.keys(this.gamepadMap).find(id => new RegExp(id, 'gi').test(gamepad.id));
      if (!gamepadId) {
        console.error(`No gamepad mapping found matching [${gamepad.id}]`);
        return;
      }

      const pressedButton = gamepad.buttons.findIndex(b => b.pressed || b.value > 0);
      if (pressedButton < 0) {
        return;
      }
      const gamepadButton = this.gamepadMap[gamepadId][pressedButton];
      if (!gamepadButton) {
        console.error(`No button mapping found for gamepad [${gamepadId}] and button [${pressedButton}]`);
        return;
      }

      const button = gamepadButton[this.mapping];
      if (!button) {
        console.error(
          `No button mapping found for gamepad [${gamepadId}] and button [${pressedButton}] and type [${this.mapping}]`
        );
        return;
      }

      this.dispatchEvent(
        new CustomEvent('gamepad-button', {
          detail: {
            gamepad,
            gamepadButton,
            pressedButton,
            button
          }
        })
      );
    }
  }

  static get properties() {
    return {
      listenEvery: { type: Number, attribute: 'listen-every' },
      mapping: { type: String }
    };
  }

  render() {
    return html``;
  }
}

customElements.define('gamepad-controller', GamepadController);
